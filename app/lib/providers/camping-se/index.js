var through = require('through2');
var request = require('request');
var GeoJSON = require('geojson');
var JSONStream = require('JSONStream');

var addDetailUrl = function(pin) {
  return { 
    "id": pin.Id,
    "lat": pin.Latitude,
    "lon": pin.Longitude,
    "details": "http://www.camping.se/sv/campingar/" + pin.Id + "/" + pin.UrlName + "/",
    "description": pin.Description,
    "name": pin.Title
  }
};

// http://www.camping.se/sv/campingar/3160/Bjorklidens-Camping/

var campingapi = {
  retrieve: function(options, callback) {
    return request
      .get('http://www.camping.se/templates/camping/ajax/businesses.ashx', 
        { qs: 
          { 
            pagesize: options.pageSize || 1000
          } 
        }
      )
      .pipe(JSONStream.parse("Records.*"))
      .pipe(through.obj(function(pin, enc, done) {
        console.log(pin);
        var feature = GeoJSON.parse(
            addDetailUrl(pin), { Point: ['lat', 'lon']} );
        this.push(feature);
        done();
      }));
  }
}

module.exports = campingapi;