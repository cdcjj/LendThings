angular.module('myApp.authenticate', [])
.controller('AuthenticateController', function($scope, $http, $window, $location, Auth) {
  $scope.user = {};
  $scope.message = '';

  $scope.login = function () {
    Auth.login($scope.user)
      .then(function(id) {
        $window.localStorage.setItem('auth', id);
        $location.path('/inventory');
      })
      .catch(function(e) {
        $scope.message = e;
      });
  };

  $scope.signup = function() {
    Auth.signup($scope.user)
      .then(function(id) {
        $window.localStorage.setItem('auth', id);
        $location.path('/inventory');
      })
      .catch(function(e){
        $scope.message = e;
      });
  };
  // reset() method that clears all fields needed here
  $scope.reset = function () {

  };
});
