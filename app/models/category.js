var db = require('../config.js');
var User = require('./user.js');

var Category = db.Model.extend({
  tableName: 'category',
  user: () => {
    this.belongsToMany(User);
  },
  inventory: () => {
    this.hasMany(Inventory);
  }
});


modules.exports = Category;
