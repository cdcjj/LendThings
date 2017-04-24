var db = require('../config');
var Inventory = require('../models/inventory');

var Inventories = new db.Collection();

Inventories.model = Inventory;

module.exports = Inventories;
