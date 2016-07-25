var through = require('through2');
var tokml = require('tokml');

kmlstream = function(options) {
  var self = this;
  self.options = options;
  return through.obj(function(data, enc, cb) {
      self._geojson = self._geojson || { type: "FeatureCollection", features: [] };
      self._geojson.features.push(data);
      cb();
    }, function(cb) {
      this.push(tokml(self._geojson, self.options));
      cb();
    }
  );
};

module.exports = kmlstream;