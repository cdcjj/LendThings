angular.module('myApp.authenticate', [])
.controller('AuthenticateController', function($scope, $http, $window, $location, Auth) {
  $scope.user = {};

  $scope.login = function () {
    Auth.login($scope.user)
      .then(session => {
        $window.localStorage.setItem('auth', session);
        $location.path('/inventory');
      })
      .catch(e => {
        console.error(e);
      });
  };

  $scope.signup = function() {
    Auth.signup($scope.user)
      .then(session => {
        $window.localStorage.setItem('auth', session);
        $location.path('/inventory');
      })
      .catch(e => {
        console.error(e);
      });
  };
  // reset() method that clears all fields needed here
  $scope.reset = function () {

  };
});
