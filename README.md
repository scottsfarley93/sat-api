## Sattelite API

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

*One API to search public Satellites metadata*

A live version of this API is deployed to https://api.developmentseed.org/satellites.

This API uses Elastic Search as its engine and runs on AWS's Lambda and APIGateway using Serverless.


### Develop

To further develop a deployed version of the API, make sure you have AWS credentials with necessary access to AWS Lambda and AWS APIGateway (an admin level access will do enough):

    $ npm install -g serverless@0.5.3
    $ npm install
    $ npm run build

### Deploy:

    $ sls dash deploy


### First time installation

- Clone the repository. Then:

    $ npm install -g serverless@0.5.3
    $ npm install
    $ npm run build
    $ sls project init
    $ sls dash deploy
