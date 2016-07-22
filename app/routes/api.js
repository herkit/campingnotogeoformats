var ci = require(__base + 'providers/campingapi');
var express = require('express');
var router = express.Router();
var tokml = require('tokml');
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

router.get('/geojson', function(req, res, next) {
  console.log(req.query.categoryIds);
  ci.getpins(req.query.categoryIds, function(err, geo) {
    if (err) {
      console.log(err);
      next();
    } else {
      res.json(geo);
    }
  });
});

router.get('/:provider/kml', function(req, res, next) {
  console.log(req.query);
  var ci = require(__base + "lib/providers/" + req.params.provider;
  ci.retrieve(req.query, function(err, geo) {
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
});

module.exports = router;
