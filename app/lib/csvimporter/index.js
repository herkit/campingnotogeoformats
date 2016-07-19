var csv = require('csv');
var fs = require('fs');
var GeoJSON = require('geojson');
var TransformToGeoJson = require('../import-csv');

var csvimport = function(stream, options, callback) {
  var csvoptions = options.csv || {};
  var geoJSONoptions = options.geoJSON || {};

  return stream
    .pipe(csv.parse(csvoptions || {}))
    .pipe(new TransformToGeoJson(geoJSONoptions));
}

module.exports.importStream = csvimport;