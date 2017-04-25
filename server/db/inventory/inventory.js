let db = require('../config.js');
let User = require('../user/user');
let Category = require('../category/category');

let Inventory = db.Model.extend({
  tableName: 'inventory',
  user: () => {
    return this.belongsTo(User, 'user_id');
  },
  category: () => {
    return this.belongsTo(Category, 'category_id');
  }
});


module.exports = Inventory;
