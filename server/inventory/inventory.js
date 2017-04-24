var db = require('../config.js');
var User = require('./user.js');

var Inventory = db.Model.extend({
  tableName: 'inventory',
  user: () => {
    return this.belongsTo(User, 'user_id');
  },
  category: () => {
    return this.belongsTo(Category, 'category_id');
  }),
});


modules.exports = Inventory;
