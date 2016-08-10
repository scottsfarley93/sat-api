'use strict';

var env = require('node-env-file');
env(__dirname + '/.env');
var Search = require('sat-api-lib');

module.exports.count = function(event, context) {
  var search = new Search(event);

  search.count(function (err, response) {
    return context.done(err, response);
  });
};


module.exports.geojson = function(event, context) {
  var search = new Search(event);

  search.geojson(function (err, response) {
    return context.done(err, response);
  });
};

module.exports.legacy = function(event, context) {
  var search = new Search(event);

  search.legacy(function (err, response) {
    return context.done(err, response);
  });
};

module.exports.simple = function(event, context) {
  var search = new Search(event);

  search.simple(function (err, response) {
    return context.done(err, response);
  });
};
