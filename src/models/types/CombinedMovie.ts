import {IMovie} from "../interfaces/IMovie";
import {IOmdbMovie} from "../interfaces/IOmdbMovie";

export type CombinedMovie = IMovie & IOmdbMovie;
