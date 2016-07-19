var stream = require("stream");
var GeoJSON = require("geojson");
var util = require("util");
var Transform = stream.Transform;

function TransformToGeoJson(options) {
  if (!(this instanceof TransformToGeoJson)) {
    return new TransformToGeoJson(options);
  }

  Transform.call(this, { objectMode: true });
  this.options = options;
}
util.inherits(TransformToGeoJson, Transform);

TransformToGeoJson.prototype._transform = function (obj, encoding, done) {
  try {
    var geoJsonData = GeoJSON.parse(obj, Object.assign({}, this.options));
    this.push(geoJsonData);
  } catch (e) {
    console.log("Error: ", e);
    console.log(obj);
  }
  done();
}

module.exports = TransformToGeoJson;