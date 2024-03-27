import express from 'express';
import movieRoutes from "./movieRoutes";

const router = express.Router();

export default (): express.Router => {
    movieRoutes(router)

    return router;
};