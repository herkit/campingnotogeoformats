var request = require('request-json');
var client = request.createClient('http://book.camping.no/no/produktetmap/');
var GeoJSON = require('geojson');

var addDetailUrl = function(pin, index) {
  return { 
    "id": pin.Id,
    "lat": pin.Lat,
    "lon": pin.Lon,
    "details": "http://book.camping.no/no/overnatting/a" + pin.Id + "/" + encodeURIComponent(pin.Name.replace(/\s+/gi, "-")) + "/detaljer",
    "description": pin.ShortDescription,
    "name": pin.Name,
    "category": pin.Category
  }
};

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