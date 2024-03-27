import {createServer} from '../utils/serverUtil';
import supertest from 'supertest';
import {HTTP_STATUS_CODES} from "../constants/appConstants";

const app = createServer();

const localMovie = {
    'description': 'Unter der Obhut des Panthers Baghira wächst das Findelkind Mogli bei einer Wolfsfamilie auf. Doch da erschüttert die Rückkehr des menschenfressenden Tigers Shir Khan den Dschungel. Die Sorge um Mogli zwingt Baghira zu der einzig möglichen Entscheidung.',
    'duration': 75,
    'id': 11528860,
    'imdbid': 'tt0061852',
    'title': 'Das Dschungelbuch'
};
const omdbMovie = {
    'Title': 'The Jungle Book',
    'imdbID': 'tt0061852'
};
describe('movies', () => {
    describe('get movie with an id route', () => {
        describe('given the movie does not exist in the local DB', () => {
            it('should return a 404 status', async () => {
                const movieId = 59793000;
                await supertest(app).get(`/api/movies/${movieId}`).expect(HTTP_STATUS_CODES.notFound);
            });
        });

        describe('given the movie has inconsistent id', () => {
            it('should return a 400 status', async () => {
                const movieId = '5979300SS';
                await supertest(app).get(`/api/movies/${movieId}`).expect(HTTP_STATUS_CODES.badRequest);
            });
        });

        describe('given the movie exist in the local DB', () => {
            it('should return a 200 status', async () => {
                const {body, statusCode} = await supertest(app).get(`/api/movies/${localMovie.id}`);

                expect(statusCode).toBe(HTTP_STATUS_CODES.ok);
                expect(body.id).toBe(localMovie.id);
            });
        });

        describe('given the movie id 11528860 exist in the local DB', () => {
            it('should contain the omdb title', async () => {
                const {body, statusCode} = await supertest(app).get(`/api/movies/${localMovie.id}`);

                expect(statusCode).toBe(HTTP_STATUS_CODES.ok);
                expect(body.title).toBe(omdbMovie.Title);
            });
        });

        describe('given the imdb id is supplied', () => {
            it('should return a movie object', async () => {
                const {body, statusCode} = await supertest(app).get(`/api/movies/${omdbMovie.imdbID}`);

                expect(statusCode).toBe(HTTP_STATUS_CODES.ok);
                expect(body.imdbid).toBe(omdbMovie.imdbID);
                expect(body.id).toBe(localMovie.id);
            });
        });
    });
});