var request = require('request');
var client = request.createClient('http://www.camping.se/templates/camping/ajax');
var GeoJSON = require('geojson');
var JSONStream = require('JSONStream');

var addDetailUrl = function(pin, index) {
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
    client
      .get('businesses.ashx', 
        { qs: 
          { 
            pagesize: options.pageSize || 1000
          } 
        }
      )
      .pipe(JSONStream.parse())
      .pipe()
      function(err, res, body) {
        if (err)
          callback(err);
        else
        {
          var json = GeoJSON.parse(
            body.Pins.map(addDetailUrl), 
            {Point: ['lat', 'lon']});

          callback(null, json);
        }
      }
    )
  }
}

module.exports = campingapi;