import {NormalizedMovie} from "./NormalizedMovie";

export type ConsolidatedMovie = Omit<NormalizedMovie, 'productionyear' | 'id' |'duration' | 'director' | 'writer' |'actors' | 'runtime'> & {director: string[], writer: string[], actors: string[], runtime: number};