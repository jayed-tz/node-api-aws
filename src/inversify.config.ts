import {Container} from "inversify";
import {IMoviesRepository} from "./models/interfaces/IMovieRepository";
import {IMoviesService} from "./models/interfaces/IMoviesService";
import {MoviesRepository} from "./db/moviesRepository";
import {MoviesService} from "./services/moviesService";
import {IMoviesController} from "./models/interfaces/IMoviesController";
import {MoviesController} from "./controllers/moviesController";
import {DITYPES} from "./constants/appConstants";
import {IApiUtils} from "./models/interfaces/IApiUtils";
import {ApiUtils} from "./utils/apiUtil";

export const iocContainer = new Container();

iocContainer.bind<IMoviesController>(DITYPES.MoviesController).to(MoviesController);
iocContainer.bind<IMoviesService>(DITYPES.MoviesService).to(MoviesService);
iocContainer.bind<IMoviesRepository>(DITYPES.MoviesRepository).to(MoviesRepository);
iocContainer.bind<IApiUtils>(DITYPES.ApiUtils).to(ApiUtils);