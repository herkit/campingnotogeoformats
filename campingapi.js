var request = require('request-json');
var client = request.createClient('http://book.camping.no/no/produktetmap/');
var GeoJSON = require('geojson');

var campingapi = {
  getpins: function(categoryIds, callback) {
    client.get('getpins', 
      { qs: 
        { 
          categoryIds: categoryIds 
        } 
      }, 
      function(err, res, body) {
        if (err)
          callback(err);
        else
        {
          var json = GeoJSON.parse(body.Pins, {Point: ['Lat', 'Lon']});
          callback(null, json);
        }
      }
    )
  }
}

module.exports = campingapi;