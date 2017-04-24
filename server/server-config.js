var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var db = require('./app/config');
var Users = require('./app/collections/users');
var User = require('./app/models/users');
var Categories = require('./app/collections/categories');
var Category = require('./app/models/category');
var Inventories = require('./app/collections/inventories');
var Inventory = require('./app/models/inventory');

var app = express();
app.use(moregan('dev'));
app.use(bodyParser.json());
app.use(bodyParsert.urlencoded({extend: true}));
app.use(express.static(__dirname + '../client'));
app.use(session({
  secret: 'keyboard corgi',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 3.6e+6}
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;


req.session.destroy(function)(err) {
  // destroy
  // redirect
}

req.session.regenerate(function(err) {
  // will have new session here.
})
