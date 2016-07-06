var ci = require(__base + 'campingapi');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/gpx', function(req, res, next) {
  console.log(req.query.categoryIds);
  ci.getpins(req.query.categoryIds, function(err, pinres, body) {
    if (err) {
      console.log(err);
      next();
    } else {
      res.json(body.Pins);
    }
  });
});

module.exports = router;
