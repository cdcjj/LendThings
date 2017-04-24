let db = require('../config');
let User = require('./user');

let Users = db.Collection.extend({
  model: User
});


module.exports = Users;
