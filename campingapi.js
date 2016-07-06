var request = require('request-json');
var client = request.createClient('http://book.camping.no/no/produktetmap/');

var campingapi = {
  getpins: function(categoryIds, callback) {
    client.get('getpins', { qs: { categoryIds: categoryIds } }, 
    callback)
  }
}

module.exports = campingapi;