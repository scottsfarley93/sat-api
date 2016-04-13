'use strict';
// var Boom = require('boom');
var ejs = require('elastic.js');
var elasticsearch = require('elasticsearch');

var queries = require('./queries.js');

var client = new elasticsearch.Client({
  host: process.env.ES_HOST || 'localhost:9200',

  // Note that this doesn't abort the query.
  requestTimeout: 50000  // milliseconds
});



module.exports.handler = function(event, context) {

  // Build Elastic Search Query
  var q = ejs.Request();
  var size = (event.limit) ? event.limit : 1;
  var page = (event.page) ? event.page: 1

  var frm = (page - 1) * size;

  if (Object.keys(event).length > 0) {
    q = queries(event, q);
  } else {
    q.query(ejs.MatchAllQuery());
  }

  var search_params = {
    index: process.env.ES_INDEX || 'satellites',
    body: q.sort('date', 'desc'),
    size: size,
    from: frm
  };


  client.search(search_params).then(function (body) {

    var response = [];
    var count = 0;

    count = body.hits.total;
    for (var i = 0; i < body.hits.hits.length; i++) {
      response.push(body.hits.hits[i]._source);
    }

    var r = {
      meta: {
        found: count,
        name: "sat-api",
        license: "CC0-1.0",
        website: "https://api.developmentseed.org/satellites/",
        page: page,
        limit: size
      },
      results: response
    };

    return context.done(null, r);
  }, function (err) {
    return context.done(err);
  });


};
