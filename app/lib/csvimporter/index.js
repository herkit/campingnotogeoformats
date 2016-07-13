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

var csvimport = function(file, options, callback) {
  var parse = csv.parse();
  var stream = fs.createReadStream(file);
  stream
    .pipe(csv.parse({
      "delimiter": ",",
      "columns": [
        "lon", 
        "lat", 
        "gps_composite_field",
        "campground_code",
        "campground_name",
        "type",
        "phone",
        "dates_open",
        "comments",
        "number_of_campsites",
        "elevation",
        "amenities",
        "state",
        "distance",
        "heading",
        "nearest_city"
      ],
      "auto-parse": true
    }))
    .pipe(
      csv.transform(
        function(record){
          return GeoJSON.parse(record, { Point: ['lat', 'lon'] });
        }
      )
    )
    .pipe(csv.stringify())
    .pipe(process.stdout);
}

module.exports = csvimport;