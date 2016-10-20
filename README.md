## Satellite API

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Build Status](https://travis-ci.org/sat-utils/sat-api.svg?branch=develop)](https://travis-ci.org/sat-utils/sat-api)

*One API to search public Satellites metadata*

A live version of this API is deployed to https://api.developmentseed.org/satellites.

This API uses Elastic Search as its engine and runs on AWS's Lambda and APIGateway using Serverless.

### Develop

To further develop a deployed version of the API, make sure you have AWS credentials with necessary access to AWS Lambda and AWS APIGateway (an admin level access will do enough):

    $ npm install -g serverless@beta
    $ npm install

Make `.env` file and `ES_HOST=example.com/blahblahblah` to the file

### Local Test

    $ npm run test

### Deploy:

locally:

    $ serverless deploy

`develop` branch is deployed to staging.

`master` is deployed to production.

### About
The Sat API was made by [Development Seed](http://developmentseed.org).
