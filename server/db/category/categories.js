let db = require('../config');
let Category = require('./category');

let Categories = db.Collection.extend({
  model: Category
});

module.exports = Categories;
