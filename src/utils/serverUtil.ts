import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import {API_PATH, FALLBACK_PATH} from "../constants/appConstants";
import router from "../router";

export const createServer = () => {
    const app = express();
    app.use(cors());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(API_PATH, router());
    app.use((req, res) => {
        res.redirect(FALLBACK_PATH);
    });

    return app;
}
