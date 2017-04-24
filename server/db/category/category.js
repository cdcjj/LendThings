let db = require('../config.js');
let User = require('./user.js');

let Category = db.Model.extend({
  tableName: 'category',
  user: () => {
    this.belongsToMany(User);
  },
  inventory: () => {
    this.hasMany(Inventory);
  }
});


modules.exports = Category;
