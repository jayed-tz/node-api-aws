import {IOmdbMovie} from "./IOmdbMovie";

export interface IApiUtils {
    getMovieDataFromOmdb(imdbId: string): Promise<IOmdbMovie>
}