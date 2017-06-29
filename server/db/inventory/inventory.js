var db = require('../config.js');
var User = require('../user/user');
var Category = require('../category/category');

var Inventory = db.Model.extend({
  tableName: 'inventory',
  user: function() {
    return this.belongsTo(User, 'user_id');
  },
  category: function(){
    return this.belongsTo(Category, 'category_id');
  }
});


module.exports = Inventory;
