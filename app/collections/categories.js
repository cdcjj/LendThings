var db = require('../config');
var Category =  require('../models/category');

var Categories = new db.Collection();

Categories.model = Category;

module.exports = Categories;
