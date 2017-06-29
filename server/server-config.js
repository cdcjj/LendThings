var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');

var db = require('./db/config');
var User = require('./db/user/user');
var Users = require('./db/user/users');
var Category = require('./db/category/category');
var Categories = require('./db/category/categories');
var Inventory = require('./db/inventory/inventory');
var Inventories = require('./db/inventory/inventories');

var app = express();
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


app.get('/api/category', function(req, res, next) {
  new Category({}).fetchAll()
    .then(function(categories){
      res.json(categories);
    })
    .catch(function(err) {
      next();
    });
});

app.post('/api/category', function(req, res, next) {
  var name = req.body.name;
  new Category({name: name}).fetch()
    .then(function(category) {
      if (category === null) {
        // create new category
        var newCategory = new Category({
          name: name
        });
        newCategory.save()
          .then(function(catModel){
            res.json(catModel);
          });
      } else {
        return next(new Error('Category Already Exists'));
      }
    })
    .catch(function(error) {
      next(error);
    });
});

app.get('/api/inventory', function(req, res, next) {
  var cat_id;

  new Category({category: req.params}).fetch()
    .then(function(catModel) {
      if (catModel === null) {
        return next(new Error('no Category found'));
      } else {
        cat_id = catModel.get('id');
        new Inventory({category_id: cat_id }).fetchAll()
        .then(function(things) {
          res.json(things.models);
        })
        .catch(function(err) {
          next();
        })
      }
    })

});

app.post('/api/inventory', function(req, res) {
  var name = req.body.name;
  var date = req.body.date;
  var amount = req.body.amount;
  var category = req.body.category;
  var user_id = req.body.user_id;

  new Category({name: category}).fetch()
    .then(function(catModel) {
      if (catModel === null) {
        // create new category
        var newCategory = new Category({
          name: category
        });
        newCategory.save()
          .then(function(catModel) {
            category = catModel.get('id');
          });
      } else {
        category = catModel.get('id');
      }
    })
    .then(function() {
      new Inventory({name: name}).fetch()
        .then(function(thing) {
          if (thing === null) {
            // create new inventory object
            var newInventory = new Inventory({
              name: name,
              date: date,
              amount: amount,
              user_id: user_id,
              category_id: category
            });
            newInventory.save()
            .then(function(inventory) {
              res.json(inventory);
            })
          }
        })
        .catch(function(error) {
          next(error);
        });
    })
    .catch(function(error) {
      next(error);
    });
});

app.post('/api/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  // query db for user
  new User({username: username}).fetch()
    .then(function(user) {
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
    .catch(function(error) {
      next(error);
    });
});

app.post('/signup', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  new User({username: username}).fetch()
    .then(function(user) {
      if (user === null) { // add
        var newUser = new User({
          username: username,
          password: password
        });
        newUser.save()
          .then(function(user) {
            req.session.regenerate(function(err) {
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
    .catch(function(error) {
      next(error);
    });
});

app.get('*', function(req, res) {
  res.sendfile(path.join(__dirname + './../client/index.html'));
})
module.exports = app;
