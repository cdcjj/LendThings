angular.module('myApp.services', [])

.factory('Inventory', function($http) {
  var getAll = function(category) {
    return $http({
      method:'GET',
      url: '/api/inventory',
      data: category
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var addInventory = function (thing) {
    return $http({
      method: 'POST',
      url: '/api/inventory',
      data: thing
    });
  };

  return {
    getAll: getAll,
    addInventory: addInventory
  };
})
.factory('Auth', function($http, $location, $window) {
  var login = function(user) {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: user
    })
    .then(function(resp) {
      return resp.data.session.id;
    })
    .catch(error => {
      throw new Error(error);
    });
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function(resp) {
      return resp.data.session.id;
    })
    .catch(error => {
      throw new Error(error);
    })
  };

  var isLoggedIn = function () {
    return !!$window.localStorage.getItem('auth');
  }

  var signout = function () {
    $window.localStorage.removeItem('auth');
    $location.path('/login');
  }

  return {
    login: login,
    signup: signup,
    isLoggedIn: isLoggedIn,
    signout: signout
  };
});
