import {IMovie} from "./IMovie";
import {IFilter} from "./IFilter";

export interface IMoviesService {
    getMergedData(imdbId: string | null, localId: number | null): Promise<any>;

    search(filters: IFilter[]): Promise<any>;
}