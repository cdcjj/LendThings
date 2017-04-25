let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let session = require('express-session');

let db = require('./db/config');
let User = require('./db/user/user');
let Users = require('./db/user/users');
let Category = require('./db/category/category');
let Categories = require('./db/category/categories');
let Inventory = require('./db/inventory/inventory');
let Inventories = require('./db/inventory/inventories');

let app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
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


app.get('/inventory', (req, res) => {
  // render inventory page
});

app.post('/inventory', (req, res) => {
  let name = req.body.name;
  let date = req.body.date;
  let amount = req.body.amount;
  let category = req.body.category;
  let user_id = req.session.user.get('id');

  new Categories({name: category}).fetch()
    .then(catModel => {
      if (catModel === null) {
        // create new category
        Categories.create({
          name: category
        }).save()
          .then(catModel => {
            category = catModel.get('id');
          });
      } else {
        category = catModel.get('id');
      }
    })
    .then(() => {
      new Inventories({name: name}).fetch()
        .then(thing => {
          if (thing === null) {
            // create new inventory object
            Inventories.create({
              name: name,
              date: date,
              amount: amount,
              user_id: user_id,
              category_id: category
            }).save()
          }
        })
    })
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

app.get('/signup', (req, res) => {
  // render /signup page
})
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
        }).save()
          .then(user => {
            req.session.user = user;
            res.redirect('/inventory');
          });
      } else {
        console.log('username already taken');
        res.redirect('/signup');
      }
    })
});

module.exports = app;

//
// req.session.destroy(function)(err) {
//   // destroy
//   // redirect
// }
//
// req.session.regenerate(function(err) {
//   // will have new session here.
// })
