var db = require('../config');
var Category = require('./category');

var Categories = db.Collection.extend({
  model: Category
});

module.exports = Categories;
