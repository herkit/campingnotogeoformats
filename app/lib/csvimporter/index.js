var csv = require('csv');
var fs = require('fs');
var GeoJSON = require('geojson');

var csvimport = function(stream, options, callback) {
  var parse = csv.parse();
  var csvoptions = options.csv || {};
  var geoJSONoptions = options.geoJSON || {};

  return stream
    .pipe(csv.parse(csvoptions || {}))
    .pipe(
      csv.transform(
        function(record){
          try {
            return GeoJSON.parse(record, Object.assign({}, geoJSONoptions));
          } catch (err) {
            console.log("Error: ", err);
            console.log(geoJSONoptions);
            return;
          }
        }
      )
    );
}

module.exports.importStream = csvimport;