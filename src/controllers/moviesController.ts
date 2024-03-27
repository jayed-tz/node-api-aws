import {Request, Response} from 'express';
import {isIdType} from "../models/typeGuards";
import {InvalidIdError} from "../models/InvalidIdError";
import {MovieNotFoundError} from "../models/MovieNotFoundError";
import {IFilter} from "../models/interfaces/IFilter";
import {DITYPES, HTTP_STATUS_CODES, NUMBER_FIELDS} from "../constants/appConstants";
import {inject, injectable} from "inversify";
import {IMoviesService} from "../models/interfaces/IMoviesService";
import {IMoviesController} from "../models/interfaces/IMoviesController";

@injectable()
export class MoviesController implements IMoviesController {
    @inject(DITYPES.MoviesService)
    private moviesService: IMoviesService;

    public searchMoviesHandler = async (req: Request, res: Response): Promise<Response> => {
        try {
            // parse filter values that is supposed to be number type
            const filters: IFilter[] = [];

            for (let key in req.query) {
                const keyLower = key.toLowerCase();
                if (NUMBER_FIELDS.includes(keyLower)) {
                    filters.push({
                        [keyLower]: parseInt(`${req.query[key]}`)
                    })
                } else {
                    filters.push({
                        [keyLower]: `${req.query[key]}`
                    })
                }
            }

            const movies = await this.moviesService.search(filters);
            return res.status(200).json(movies);
        } catch (error) {
            console.error(error);
            return res.sendStatus(400);
        }
    };

    public getMovieByIdHandler = async (req: Request, res: Response): Promise<Response> => {
        try {
            const queryString = req.params.id;
            let imdbId = null;
            let localId = null;

            if (!isIdType(queryString)) {
                throw new InvalidIdError(`Invalid id: ${queryString}`);
            }

            const parsedId = parseInt(queryString);

            if (isNaN(parsedId)) {
                //string ID with tt
                imdbId = queryString;
            } else {
                //number ID
                localId = parsedId;
            }

            return res.json(await this.moviesService.getMergedData(imdbId, localId));
        } catch (error: any) {
            console.error('Error getting movie by ID:', error);

            if (error instanceof InvalidIdError) {
                res.status(HTTP_STATUS_CODES.badRequest).json({error: error.message});
            } else if (error instanceof MovieNotFoundError) {
                res.status(HTTP_STATUS_CODES.notFound).json({error: error.message});
            } else {
                res.status(HTTP_STATUS_CODES.internalServerError).send('Internal Server Error');
            }
        }
    };
}
