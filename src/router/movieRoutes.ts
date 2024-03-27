import {Router} from 'express';
import {iocContainer} from "../inversify.config";
import {IMoviesController} from "../models/interfaces/IMoviesController";
import {DITYPES} from "../constants/appConstants";

const moviesController = iocContainer.get<IMoviesController>(DITYPES.MoviesController);

const movieRoutes = (router: Router) => {
    router.get('/movies', (req, res) => {
        moviesController.searchMoviesHandler(req, res);
    });
    router.get('/movies/:id', (req, res) => {
        moviesController.getMovieByIdHandler(req, res);
    });
};

export default movieRoutes;