import axios from 'axios';
import {IOmdbMovie} from "../models/interfaces/IOmdbMovie";
import {OMDB_API_KEY} from "../constants/appConstants";
import {injectable} from "inversify";
import {IApiUtils} from "../models/interfaces/IApiUtils";

@injectable()
export class ApiUtils implements IApiUtils {
    //public getMovieDataFromOmdb = async (imdbId: string): Promise<IOmdbMovie> => {
    public getMovieDataFromOmdb = async (imdbId: string): Promise<IOmdbMovie> => {
        const omdbUrl = `https://www.omdbapi.com/?i=${imdbId}&apikey=${OMDB_API_KEY}&plot=full`;

        try {
            const response = await axios.get(omdbUrl);

            return response.data;
        } catch (error) {
            console.error(`Error fetching movie data from OMDB due to: ${error}`);
            throw error;
        }
    };
}

