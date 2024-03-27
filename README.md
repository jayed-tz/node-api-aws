# Implementation of Movie Metadata Search

This project contains the implementation of the technical task for a node API.
The project uses typescript latest stable version 5.3.3. The node version was 21.5.0 during the development.

## Installation

Install the dependencies using:

`npm install`

Serve the API using:

`npm run dev`


## Usage
The current configuration serves the API in port 3022 of localhost

#### Get all the movies:

http://localhost:3022/api/movies

#### Get filtered movies:

`http://localhost:3022/api/movies?title=Indiana Jones and the Last Crusade&bla=5&productionyear=1989&rated=PG-13&runtime=127&Writer=George Lucas`

#### Get a single movie:

http://localhost:3022/api/movies/5979300

## Live
Use the following URL to see a demonstration of the project:

https://xq01wznyli.execute-api.us-east-1.amazonaws.com/joyn/api/movies/5979300

cURL command:

`curl --location 'https://xq01wznyli.execute-api.us-east-1.amazonaws.com/joyn/api/movies/5979300' \
--header 'x-api-key: REPLACE_KEY'`

> Please replace the part **REPLACE_KEY** with the key sent via email.

## Additional Task: AWS Lambda Function- implemented
The package **serverless** is used to package and deploy an AWS lambda function with a trigger from the API Gateway via CloudFormation.
For configuring serverless, please follow online resources like [this](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/). The configuration is bare minimum.

In order to deploy, follow these instructions :
1. Remove or comment out the following code in 'src/index.ts'
```
app.listen(PORT, async () => {
    console.log(`App is running at http://localhost:${PORT}`);
});
```
2. Replace `REPLACE_KEY` with an appropriate API key in `serverless.yml` (and any other info like region)
3. Run the command: `npm run deploy`
3. Follow the command line to retrieve the generated RESTful API URL
4. Sample URL: https://xxxx.execute-api.us-east-1.amazonaws.com/joyn/api/movies/5979300
5. Use an api key via the header `x-api-key`

## Assumptions from the readme file
1. Removed certain fields from the merged object due to redundancy
2. Normalized the case of the properties
3. Inspecting the ID formats, it was assumed that
   1. IMDB movie IDs begin with the string `'tt'`
   2. JSON file movie IDs are numeric

Based on the assumptions, the following strategy was taken (referring to the content of `merge()` in movieService.ts):

Step 1: Combine the data from both sources (please refer to the type `CombinedMovie`)

Step 2: Normalize the properties (please refer to the type `NormalizedMovie`)

Step 3: Apply merging rules (please refer to the type `ConsolidatedMovie`)

Step 4: Remove the redundant properties (please refer to the type `MergedMovie`)

## Notable Libraries
'IntensifyJs' was used for DI

'Axios' was used as the HTTP client

'Nodemon' was used to serve in development environment

## Improvements
The implementation was kept simple with potential enhancement and improvement areas on:
1. Logging
2. Error Handling
3. Environment based config files
4. Enriched serverless template (Using AWS lambda alias, CloudWatchLogs, Env variables, layers, invocation settings  etc.)
5. Linting
6. Filter logic
7. Caching
8. Test cases
etc.
