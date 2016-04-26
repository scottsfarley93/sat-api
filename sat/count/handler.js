'use strict';

var _ = require('lodash');
var ejs = require('elastic.js');
var elasticsearch = require('elasticsearch');

var queries = require('../libs/queries.js');

var client = new elasticsearch.Client({
  host: process.env.ES_HOST || 'localhost:9200',

  // Note that this doesn't abort the query.
  requestTimeout: 50000  // milliseconds
});

module.exports.handler = function(event, context) {

  var params;

  if (event.method === 'GET') {
    params = event.query;
  } else if (event.method === 'POST') {
    params = event.body;
  }

  // Build Elastic Search Query
  var q = ejs.Request();

  var dateHistogram = function (name) {
    return ejs.DateHistogramAggregation(name + '_histogram').format('YYYY-MM-DD').interval('day');
  }
  var termsAggregation = function (name) {
    return ejs.TermsAggregation('terms_' + name);
  }

  var aggr = {
    date: dateHistogram,
    satellite_name: termsAggregation,
    latitude_band: termsAggregation,
    utm_zone: termsAggregation,
    product_path: termsAggregation,
    grid_square: termsAggregation,
    sensing_orbit_number: termsAggregation,
    sensing_orbit_direction: termsAggregation
  }

  if (_.has(params, 'fields')) {
    var fields = params['fields'].split(',');

    console.log(fields)
    _.forEach(fields, function(field) {
      console.log(field)
      if (_.has(aggr, field)) {
        q.agg(aggr[field](field).field(field))
      }
    });

    params = _.omit(params, ['fields']);
  }

  if (Object.keys(params).length > 0) {
    q = queries(params, q);
  } else {
    q.query(ejs.MatchAllQuery());
  }

  console.log(JSON.stringify(q.toJSON()))

  var search_params = {
    index: process.env.ES_INDEX || 'sat-api',
    body: q,
    size: 0
  };

  client.search(search_params).then(function (body) {

    var response = [];
    var count = 0;

    count = body.hits.total;

    var r = {
      meta: {
        found: count,
        name: "sat-api",
        license: "CC0-1.0",
        website: "https://api.developmentseed.org/satellites/",
      },
      counts: body.aggregations
    };

    return context.done(null, r);
  }, function (err) {
    return context.done(err);
  });
};
