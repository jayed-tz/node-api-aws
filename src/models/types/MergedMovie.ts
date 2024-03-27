import {LowercaseKeys} from "./LowercaseKeys";
import {IOmdbMovie} from "../interfaces/IOmdbMovie";
import {IMovie} from "../interfaces/IMovie";
import {UndesiredPropType} from "./UndesiredPropType";
import {ConsolidatedMovie} from "./ConsolidatedMovie";

export type MergedMovie = Omit<ConsolidatedMovie, UndesiredPropType>;