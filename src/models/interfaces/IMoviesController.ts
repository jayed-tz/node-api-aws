import {Request, Response} from "express";

export interface IMoviesController {
    searchMoviesHandler(req: Request, res: Response): Promise<Response>;

    getMovieByIdHandler(req: Request, res: Response): Promise<Response>;
}