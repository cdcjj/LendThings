const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');

let db = require('./db/config');
let User = require('./db/users/user');
let Users = require('./db/users/users');
let Category = require('./db/category/category');
let Categories = require('./db/category/categories');
let Inventory = require('./db/inventory/inventory');
let Inventories = require('./db/inventory/inventories');

let app = express();
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

app.get('/login', (req, res) => {
  // render login page
});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  // query db for user
  new User({username: username}).fetch()
    .then(user => {
      if (user === null) { // no user found in db
        console.log('no user found')
        res.redirect('/signup');
      } else { // if user found
        user.comparePassword(password).then(isMatch => { // compare password
          if (isMatch) { //if matched-- redirect to inventory.
            // start session
            req.session.user = user;
            res.redirect('/inventory');
          } else {
            console.log('invalid username and password');
            res.redirect('/login');
          }
        });
      }
    })

});


app.post('/signup', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  new User({username: username}).fetch()
    .then(user => {
      if (user === null) { // add
        // create a new User Model
        Users.create({
          username: username,
          password: password
        })
      } else {
        console.log('username already taken');
        res.redirect('/signup');
      }
    })
});

module.exports = app;


req.session.destroy(function)(err) {
  // destroy
  // redirect
}

req.session.regenerate(function(err) {
  // will have new session here.
})
