var ci = require(__base + 'campingapi');
var express = require('express');
var router = express.Router();
var tokml = require('tokml');

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

router.get('/kml', function(req, res, next) {
  console.log(req.query.categoryIds);
  ci.getpins(req.query.categoryIds, function(err, geo) {
    if (err) {
      console.log(err);
      next();
    } else {
      res.send(tokml(geo));
    }
  });
});

module.exports = router;
