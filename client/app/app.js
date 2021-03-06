var app = angular.module('myApp', [
  'myApp.services',
  'myApp.authenticate',
  'myApp.inventory',
  'ngRoute'
])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider
  .when('/', {
    templateUrl: "app/views/welcome.html",
  })
  .when('/login', {
    templateUrl: "app/views/login.html",
    controller: 'AuthenticateController'
  })
  .when('/signup', {
    templateUrl: "app/views/signup.html",
    controller: 'AuthenticateController'
  })
  .when('/inventory', {
    templateUrl: "app/views/inventory.html",
    controller: 'InventoryController'
  })
  .otherwise('/', {
    redirectTo: '/inventory',
  });

}]);
