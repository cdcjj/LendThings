var inventoryController = require()
var usersController = require('');

module.exports = (app, express) {
  app.post('/api/users/login', userController.signin);
  app.post('/api/users/signup', userController.signup);
  app.get('/api/users/signedin', userController.checkAuth);

  app.get('/api/inventory/', inventoryController.allThings);
  app.post('/api/inventory/', inventoryController.newThings);
}
