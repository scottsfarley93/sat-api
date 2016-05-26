## Satellite API

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![Build Status](https://travis-ci.org/sat-utils/sat-api.svg?branch=develop)](https://travis-ci.org/sat-utils/sat-api)

*One API to search public Satellites metadata*

A live version of this API is deployed to https://api.developmentseed.org/satellites.

This API uses Elastic Search as its engine and runs on AWS's Lambda and APIGateway using Serverless.

### Develop

To further develop a deployed version of the API, make sure you have AWS credentials with necessary access to AWS Lambda and AWS APIGateway (an admin level access will do enough):

    $ npm install -g serverless@0.5.3
    $ npm install
    $ npm run build
    $ npm run devseed

Then go to `_meta/variables/s-variables-common.json` and replace `es_host`'s value with the url to the ElasticSearch instance

### Local Test

with Serverless

    $ cd sat/root
    $ sls function run -s dev

Test package:

    $ npm run test

### Deploy:

`develop` branch is automatically deployed to `dev` staging and `master` is deployed to `production` staging which is accessible at https://api.developmentseed.org/satellites


### First time installation

- Clone the repository. Then:

```
  $ npm install -g serverless@0.5.3
  $ npm install
  $ npm run build
  $ sls project init
  $ sls dash deploy
```

### About
The Sat API was made by [Development Seed](http://developmentseed.org).