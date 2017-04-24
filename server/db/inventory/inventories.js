let db = require('../config');
let Inventory = require('./inventory');

let Inventories = db.Collection.extend({
  model: Iventory
});


modules.exports = Inventories; 
