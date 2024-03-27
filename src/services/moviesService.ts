import {IFilter} from "../models/interfaces/IFilter";
import {IMovie} from "../models/interfaces/IMovie";
import {IOmdbMovie} from "../models/interfaces/IOmdbMovie";
import {COMPANY, DITYPES, UNDESIRED_PROPS} from "../constants/appConstants";
import {inject, injectable} from "inversify";
import {IMoviesService} from "../models/interfaces/IMoviesService";
import {IMoviesRepository} from "../models/interfaces/IMovieRepository";
import {IApiUtils} from "../models/interfaces/IApiUtils";
import {MovieNotFoundError} from "../models/MovieNotFoundError";
import {CombinedMovie} from "../models/types/CombinedMovie";
import {MergedMovie} from "../models/types/MergedMovie";
import {ConsolidatedMovie} from "../models/types/ConsolidatedMovie";
import {IUserRating} from "../models/interfaces/IUserRating";
import {NormalizedMovie} from "../models/types/NormalizedMovie";

@injectable()
export class MoviesService implements IMoviesService {
    @inject(DITYPES.MoviesRepository) private moviesRepository: IMoviesRepository;
    @inject(DITYPES.ApiUtils) private apiUtils: IApiUtils;

    private filterObjects = (movies: any[], queryFilters: IFilter[]): any[] => movies.filter(movie => {
        return queryFilters.every(queryFilter => {
            return Object.entries(queryFilter).every(([queryFilterField, queryFilterValue]) => {
                if (!movie.hasOwnProperty(queryFilterField)) {
                    return true; // arbitrary filter from user
                }
                return movie.hasOwnProperty(queryFilterField) && Array.isArray(movie[queryFilterField]) ?
                    movie[queryFilterField].includes(queryFilterValue) : movie[queryFilterField] === queryFilterValue;
            });
        });
    });

    private convertRating = (userrating: IUserRating) => ((userrating.countStar1 + userrating.countStar2 * 2 + userrating.countStar3 * 3 + userrating.countStar4 * 4 + userrating.countStar5 * 5) / userrating.countTotal).toFixed(1);

    private merge = (movieData: IMovie, omdbMovieData: IOmdbMovie): MergedMovie => {
        const combined: CombinedMovie = {
            ...movieData,
            ...omdbMovieData
        };

        const normalized = Object.fromEntries(
            Object.entries(combined).map(([k, v]) => [k.toLowerCase(), v])
        ) as NormalizedMovie;

        const consolidated: ConsolidatedMovie = {
            ...normalized,
            title: omdbMovieData.Title,
            description: omdbMovieData.Plot,
            runtime: movieData.duration,
            ratings: [
                ...omdbMovieData.Ratings,
                {
                    Source: COMPANY,
                    Value: this.convertRating(movieData.userrating)
                }
            ],
            director: omdbMovieData.Director.split(',').map((it: string) => it.trim()),
            writer: omdbMovieData.Writer.split(',').map((it: string) => it.trim()),
            actors: omdbMovieData.Actors.split(',').map((it: string) => it.trim())
        };

        return {
            ...Object.fromEntries(
                Object.entries(consolidated).filter(([key]) => !UNDESIRED_PROPS.includes(key))
            )
        } as MergedMovie;
    };

    public getMergedData = async (imdbId: string | null, localId: number | null): Promise<MergedMovie> => {
        // CACHE: check if there is a Cache Hit

        let omdbMovieData = null;
        let movieData = null;

        if (localId) {
            movieData = this.moviesRepository.getMovieById(localId);

            if (!movieData) {
                throw new MovieNotFoundError(`No movie with the ID ${localId} found in the DB to enrich`);
            }

            omdbMovieData = await this.apiUtils.getMovieDataFromOmdb(movieData.imdbId);
        } else if (imdbId) {
            movieData = this.moviesRepository.getMovieByImdbIdFromContext(imdbId);

            if (!movieData) {
                throw new MovieNotFoundError(`No movie with the IMDB ID ${imdbId} found in the DB to enrich`);
            }

            omdbMovieData = await this.apiUtils.getMovieDataFromOmdb(imdbId);
        }

        // CACHE: cache the data for Cache Miss using the id of our DB as the Cache Key
        return this.merge(movieData, omdbMovieData);
    };


    public search = async (filters: IFilter[]): Promise<MergedMovie[]> => {
        const allMovies = this.moviesRepository.getAllMovies();
        const consolidatedMovies = [];

        for (let i = 0; i < allMovies.length; i++) {
            const omdbMovieData = await this.apiUtils.getMovieDataFromOmdb(allMovies[i].imdbId);
            consolidatedMovies.push(this.merge(allMovies[i], omdbMovieData));
        }

        return this.filterObjects(consolidatedMovies, filters) as MergedMovie[];
    };
}

