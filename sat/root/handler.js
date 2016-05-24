'use strict';

var Search = require('sat-api-lib');

module.exports.handler = function(event, context) {
  var search = new Search(event);

  search.simple(function (err, response) {
    return context.done(err, response);
  });
};
