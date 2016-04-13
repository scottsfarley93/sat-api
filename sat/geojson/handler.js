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
  var size = parseInt((params.limit) ? params.limit : 1);
  var page = parseInt((params.page) ? params.page: 1);

  // Accept legacy skip
  page = parseInt((params.skip) ? params.skip : page);

  var frm = (page - 1) * size;

  if (Object.keys(params).length > 0) {
    q = queries(params, q);
  } else {
    q.query(ejs.MatchAllQuery());
  }

  // console.log(JSON.stringify(q.toJSON()))

  var search_params = {
    index: process.env.ES_INDEX || 'satellites',
    body: q,
    size: size,
    from: frm
  };

  client.search(search_params).then(function (body) {

    var count = body.hits.total;

    var response = {
      type: 'FeatureCollection',
      properties: {
        found: count,
        limit: size,
        page: page
      },
      features: []
    };

    for (var i = 0; i < body.hits.hits.length; i++) {
      response.features.push({
        type: 'Feature',
        properties: {
          scene_id: body.hits.hits[i]._source.scene_id,
          satellites_name: body.hits.hits[i]._source.satellites_name,
          cloud_coverage: body.hits.hits[i]._source.cloud_coverage,
          date: body.hits.hits[i]._source.date,
          thumbnail: body.hits.hits[i]._source.thumbnail
        },
        geometry: body.hits.hits[i]._source.data_geometry
      });
    }

    return context.done(null, response);
  }, function (err) {
    return context.done(err);
  });
};
