angular.module('myApp.services', [])
.factory('Category', function($http) {
  var getAll = function() {
    return $http({
      method:'GET',
      url: '/api/category',
    })
    .then(function(resp) {
      return resp.data;
    })
    .catch(error => {
      throw new Error(error);
    });
  };

  var addCategory = function(category) {
    console.log('in services addCate: ', typeof category);
    return $http({
      method: 'POST',
      url: '/api/category',
      data: JSON.stringify(category)
    })
    .catch(error => {
      throw new Error(error);
    });
  }

  return {
    getAll: getAll,
    addCategory: addCategory
  }
})

.factory('Inventory', function($http, $window) {

  var getAll = function(filterCate) {
    return $http({
      method:'GET',
      url: '/api/inventory',
      params: filterCate
    })
    .then(function(resp) {
      return resp.data;
    })
    .catch(error => {
      throw new Error(error);
    });
  };

  var addInventory = function (thing) {
    return $http({
      method: 'POST',
      url: '/api/inventory',
      data: thing
    })
    .catch(error => {
      throw new Error(error);
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
