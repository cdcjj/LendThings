var db = require('../config.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var Inventory = require('../inventory/inventory');
var Category = require('../category/category');



var User = db.Model.extend({
  tableName: 'users',
  inventory: () => {
    return this.hasMany(Inventory);
  },
  category: () => {
    return this.belongsToMany(Category);
  },
  initialize: () => {
    this.on('creating', this.hashPassword);
  },
  comparePassword: (attempt) => {
    var comparer = Promise.promisify(bcrypt.compare);
    return comparer(attempt, this.get('password'), null);
  },
  hashPassword: () => {
    var hasher = Promise.promisify(bcrypt.hash);
    return hasher(this.get('password'), null, null).bind(this)
      .then((hash) => {
        this.set('password', hash);
      });
  }
});

module.exports = User;
