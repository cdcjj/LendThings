angular.module('myApp.authenticate', [])
.controller('Authenticate', function($scope, $http, $window, $location) {
  $scope.user = {};

  $scope.login = function () {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: user
    }).then(res => {
      console.log('login successful');

      $location.path('/inventory');
    }).catch(e => {
      console.log('Error: ', e);
    })
  },

  $scope.signup = function() {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: user
    }).then(res => {
      console.log('signup successful');
      $location.path('/inventory');
    }).catch(e => {
      console.log('Error: ', e);
    })
  },
  // reset() method that clears all fields needed here
  $scope.signout = function() {

  }
});
