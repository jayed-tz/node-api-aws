import * as fs from 'fs';
import * as path from 'path';
import {IMovie} from "../models/interfaces/IMovie";
import {IMoviesRepository} from "../models/interfaces/IMovieRepository";
import {injectable} from "inversify";
import "reflect-metadata";

@injectable()
export class MoviesRepository implements IMoviesRepository {
    private readonly folderPath = path.join(__dirname, 'files');
    public getAllMovies = (): IMovie[] => {
        try {
            // Read all files in the folder & filter on JSON files
            const files = fs.readdirSync(this.folderPath);
            const jsonFiles = files.filter(file => path.extname(file).toLowerCase() === '.json');

            const movies: IMovie[] = [];

            jsonFiles.forEach(file => {
                const fileData = fs.readFileSync(path.join(this.folderPath, file), 'utf8');
                const jsonData = JSON.parse(fileData);
                movies.push(jsonData);
            });

            return movies;
        } catch (error) {
            console.error(`Error reading JSON files from folder due to: ${error}`);

            return [];
        }
    };
    public getMovieByImdbIdFromContext = (imdbId: string): IMovie => {
        return this.getAllMovies().find(movie => movie.imdbId === imdbId);
    };

    public getMovieById = (id: number): IMovie => {
        try {
            const fileData = fs.readFileSync(path.join(this.folderPath, `${id}.json`), 'utf8');

            return fileData ? JSON.parse(fileData) : null;
        } catch (error) {
            console.error('Error reading JSON files from folder:', error);
            return null;
        }
    };
}

