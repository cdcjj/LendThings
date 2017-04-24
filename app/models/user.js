var db = require('../config.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');


var User = db.Model.extend({
  tableName: 'users',
  initialize: () => {
    this.on('creating', this.hashPassword);
  },
  comparePassword: (attempt) => {
    var comparer = Promise.promisify(bcrypt.(compare);
    return comparer(attempt, this.get('password'), null);
  },
  hashPassword: () => {
    var hasher = Promise.promisify(bcrypt.hash);
    return hasher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});

modules.exports = User;