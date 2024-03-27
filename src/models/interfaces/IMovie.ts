import {IUserRating} from "./IUserRating";

export interface IMovie {
    description: string;
    duration: number;
    id: number;
    imdbId: string;
    languages: string[];
    originalLanguage: string;
    productionYear: number;
    studios: string[];
    title: string;
    userrating: IUserRating;
}