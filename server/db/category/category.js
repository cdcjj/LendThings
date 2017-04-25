let db = require('../config.js');
let User = require('../user/user');
let Inventory = require('../inventory/inventory');

let Category = db.Model.extend({
  tableName: 'category',
  user: () => {
    this.belongsToMany(User);
  },
  inventory: () => {
    this.hasMany(Inventory);
  }
});

module.exports = Category;
