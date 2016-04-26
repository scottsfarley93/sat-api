'use strict';

var Search = require('../libs/search.js');

module.exports.handler = function(event, context) {
  var search = new Search(event);

  search.geojson(function (err, response) {
    return context.done(err, response);
  });
};
