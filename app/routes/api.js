var express = require('express');
var router = express.Router();
var tokml = require('tokml');
var GeoJSONStream = require("geojson-stream");

router.get('/:provider/geojson', function(req, res, next) {
  console.log("Loading provider: " + __base + "lib/providers/" + req.params.provider);
  var ci = require(__base + "lib/providers/" + req.params.provider);
  res.type("json");
  ci
    .retrieve(req.query)
    .pipe(GeoJSONStream.stringify())
    .pipe(res);
});

/*router.get('/:provider/kml', function(req, res, next) {
  var ci = require(__base + "lib/providers/" + req.params.provider);
  ci.retrieve(req.query).
    if (err) {
      console.log(err);
      next();
    } else {
      res.type("xml");
      res.send(tokml(geo, {
        name: 'name',
        description: 'description',
        documentName: categoryIdsToHeading(categoryIds),
        documentDescription: "En liste fra Camping.no over tilgjengelige campingmuligheter i Norge"
      }));
    }
  });
});*/

module.exports = router;
