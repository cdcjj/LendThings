angular.module('myApp.services', [])

.factory('Inventory', function($http) {
  var getAll = function() {
    return $http({
      method:'GET',
      url: '/api/inventory'
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
      url: '/api/users/login',
      data: user
    })
    .then(function(resp) {
      return resp.session.user;
    });
  };

  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function(resp) {
      return resp.session.user;
    });
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
