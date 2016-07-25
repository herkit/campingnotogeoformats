var through = require('through2');
var request = require('request');
var GeoJSON = require('geojson');
var JSONStream = require('JSONStream');

var capitalize = require('capitalize');

/*var categories = {
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
};*/

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
    return request
      .get('http://book.camping.no/no/produktetmap/getpins', 
        { qs: 
          { 
            categoryIds: options.categoryIds 
          } 
        }
      )
      .pipe(JSONStream.parse("Pins.*"))
      .pipe(through.obj(function(pin, enc, done) {
        var feature = GeoJSON.parse(
            addDetailUrl(pin), 
            { Point: ['lat', 'lon'] });
        this.push(feature);
        done();
      }));
  }
}

module.exports = campingapi;