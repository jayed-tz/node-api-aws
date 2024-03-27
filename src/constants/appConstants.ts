export const COMPANY = 'Joyn';
export const NUMBER_FIELDS = ['productionyear', 'id', 'runtime'];
export const OMDB_API_KEY = '68fd98ab';
export const API_PATH = '/api'
export const FALLBACK_PATH = '/api/movies'
export const UNDESIRED_PROPS = ['plot', 'duration', 'userrating'];
export const DITYPES = {
    MoviesRepository: Symbol.for('MoviesRepository'),
    MoviesService: Symbol.for('MoviesService'),
    MoviesController: Symbol.for('MoviesController'),
    ApiUtils: Symbol.for('ApiUtils')
};

export const HTTP_STATUS_CODES = {
    notFound : 404,
    badRequest : 400,
    internalServerError: 500,
    ok: 200
}