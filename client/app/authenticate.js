angular.module('myApp.authenticate', [])
.controller('AuthenticateController', function($scope, $http, $window, $location, Auth) {
  $scope.user = {};
  $scope.message = '';

  $scope.login = function () {
    Auth.login($scope.user)
      .then(id => {
        $window.localStorage.setItem('auth', id);
        $location.path('/inventory');
      })
      .catch(e => {
        console.error(e);
        $scope.message = 'Try Again';
      });
  };

  $scope.signup = function() {
    Auth.signup($scope.user)
      .then(id => {
        $window.localStorage.setItem('auth', id);
        $location.path('/inventory');
      })
      .catch(e => {
        console.error(e);
        $scope.message = 'Try Again';
      });
  };
  // reset() method that clears all fields needed here
  $scope.reset = function () {

  };
});
