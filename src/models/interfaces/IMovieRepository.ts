import {IMovie} from "./IMovie";

export interface IMoviesRepository {
    getAllMovies(): IMovie[];

    getMovieByImdbIdFromContext(imdbId: string): IMovie;

    getMovieById(id: number): IMovie;
}