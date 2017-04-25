let express = require('express');
let path = require('path');
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
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname + './../client/app/views'));
app.set('view engine', 'html');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));
app.use(express.static(path.join(__dirname + './../client')));
app.use(session({
  secret: 'keyboard corgi',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 3.6e+6}
}));


// app.get('/api/inventory', loggedIn, (req, res) => {
//   // render inventory page
// });
//
// app.post('/inventory', (req, res) => {
//   let name = req.body.name;
//   let date = req.body.date;
//   let amount = req.body.amount;
//   let category = req.body.category;
//   let user_id = req.session.user.get('id');
//
//   new Categories({name: category}).fetch()
//     .then(catModel => {
//       if (catModel === null) {
//         // create new category
//         Categories.create({
//           name: category
//         }).save()
//           .then(catModel => {
//             category = catModel.get('id');
//           });
//       } else {
//         category = catModel.get('id');
//       }
//     })
//     .then(() => {
//       new Inventories({name: name}).fetch()
//         .then(thing => {
//           if (thing === null) {
//             // create new inventory object
//             Inventories.create({
//               name: name,
//               date: date,
//               amount: amount,
//               user_id: user_id,
//               category_id: category
//             }).save()
//           }
//         })
//     })
// });
//
app.post('/api/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  // query db for user
  new User({username: username}).fetch()
    .then(user => {
      if (user === null) { // no user found in db
        next(new Error('no user found'));
      } else { // if user found
        user.comparePassword(password, function(isMatch) {
          if (isMatch) { //if matched-- redirect to inventory.
            // start session
            req.session.user = user;
            res.json({session: user});
          } else {
            return next(new Error('No User'));
          }
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

app.post('/signup', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  new User({username: username}).fetch()
    .then(user => {
      if (user === null) { // add
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save()
          .then(user => {
            req.session.regenerate(err => {
              if (err) {
                return next(new Error('session error'));
              }
              req.session.user = user;
              res.json({session: user});
            });
          });
      } else {
        return next(new Error('username already taken'));
      }
    })
    .catch(error => {
      next(error);
    });
});

app.get('*', (req, res) => {
  res.sendfile(path.join(__dirname + './../client/index.html'));
})
module.exports = app;
