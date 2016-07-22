var request = require('request');
var client = request.createClient('http://book.camping.no/no/produktetmap/');
var GeoJSON = require('geojson');
var JSONStream = require('JSONStream');

var capitalize = require('capitalize');

var categories = {
  "30520": "camping",
  "30358": "campinghytter",
  "30359": "leiligheter",
  "30360": "rom"
};

var categoryIdsToHeading = function(categoryIds) {
  var categoryNames = 
    categoryIds
      .split(",")
      .map(function(c, i) { 
        return categories[c] || c; 
      });

  var title = categoryNames.pop() + " i Norges land";
  if (categoryNames.length > 0)
    title = categoryNames.join(", ") + " og " + title;

  return capitalize(title);
}

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
  retrieve: function(options, callback) {
    client
      .get('getpins', 
        { qs: 
          { 
            categoryIds: options.categoryIds 
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