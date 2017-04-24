var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');


var app = express();
var router = express.Router();

app.use(partials());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
