var app = require('./server-config.js')

var port = 3000;

app.listen(port, function(){
  console.log('Listening on port ' + port);
});