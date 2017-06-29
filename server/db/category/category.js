var db = require('../config.js');
var User = require('../user/user');
var Inventory = require('../inventory/inventory');

var Category = db.Model.extend({
  tableName: 'category',
  user: function() {
    this.belongsToMany(User);
  },
  inventory: function() {
    this.hasMany(Inventory);
  }
});

module.exports = Category;
