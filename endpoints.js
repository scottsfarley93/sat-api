'use strict';

var _ = require('lodash');
var env = require('node-env-file');
env(__dirname + '/.env');
var Search = require('sat-api-lib');

var getParams = function (event) {
  var params = {};
  if (event.httpMethod === 'POST') {
    params = JSON.parse(event.body);
  } else if (event.queryStringParameters) {
    params = event.queryStringParameters;
  }

  return params
}

var search = function (action, params, context) {
  var _search = new Search({body: params});

  _search[action](function (err, response) {
    if (err) {
      return context.succeed({
        statusCode: 400,
        body: JSON.stringify(err.message)
      });
    }

    return context.succeed({
      statusCode: 200,
      body: JSON.stringify(response)
    });
  });
}

module.exports.count = function(event, context) {
  var params = getParams(event)
  search('count', params, context);
};


module.exports.geojson = function(event, context) {
  var params = getParams(event)
  search('geojson', params, context);
};

module.exports.legacy = function(event, context) {
  var params = getParams(event)
  search('legacy', params, context);
};

module.exports.simple = function(event, context) {
  var params = getParams(event)

  if (_.has(params, 'intersects') && _.isString(params.intersects)) {
    params.intersects = JSON.parse(params.intersects);
  }

  search('simple', params, context);
};
