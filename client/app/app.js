var app = angular.module('myApp', [
  'myApp.services',
  'myApp.authenticate',
  'myApp.inventory'
])
.config(($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: "login.html",
    controller: ""
  })
  .when('/signup' {
    templateURL: "signup.html",
    controller: ""
  })
  .when('/inventory', {

  })
  .otherwise('/', {
    redirectTo: '/inventory',
  })
})
