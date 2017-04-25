var db = require('../config.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Inventory = require('../inventory/inventory');
var Category = require('../category/category');



var User = db.Model.extend({
  tableName: 'users',
  inventory: function() {
    return this.hasMany(Inventory);
  },
  category: function(){
    return this.belongsToMany(Category);
  },
  initialize: function() {
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attempt, callback) {
    console.log('attempt: ', attempt);
    console.log(this.get('password'));
    bcrypt.compare(attempt, this.get('password'), function(err, match) {
      console.log(match);
      callback(match);
    });
  },
  hashPassword: function() {
    var hasher = Promise.promisify(bcrypt.hash);
    return hasher(this.get('password'), null, null).bind(this)
      .then((hash) => {
        this.set('password', hash);
      });
  }
});

module.exports = User;
