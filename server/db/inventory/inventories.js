let db = require('../config');
let Inventory = require('./inventory');

let Inventories = db.Collection.extend({
  model: Inventory
});


module.exports = Inventories;
