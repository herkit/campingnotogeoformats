var csv = require('csv');
var fs = require('fs');
var GeoJSON = require('geojson');

/*
-114.353,
53.675,
ALBE/Alberta Beach Family RV Park   CP PH:780.924.2333 mid may-late sep  SITES:30  AMEN:WES approx  mi  of Alberta Beach  53.675 -114.353,
ALBE,
Alberta Beach Family RV Park ,
CP,
780.924.2333,
mid may-late sep,
 ,
30,
 ,
WES ,
AB ,
,
,
Alberta Beach 


*/

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
            return GeoJSON.parse([record], JSON.parse(JSON.stringify(geoJSONoptions))).features[0];
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