angular.module('myApp.inventory', [])
.controller('InventoryController', function($scope, $http, $window, Category, Inventory) {
  $scope.data = {};
  $scope.inventory = {
    user_id: $window.localStorage.getItem('auth'),
  };
  $scope.category = {};
  $scope.message = {};

  var initializeCategories = function () {
    Category.getAll()
      .then(function(categories) {
        $scope.data.categories = categories;
      })
      .catch(error => {
        console.error(error);
      });
  };

  $scope.addCategory = function() {
    Category.addCategory($scope.category)
      .then( () => {
        $scope.message.category = "successfully submitted";
        initializeCategories();
      })
      .catch(error => {
        $scope.message.category = `submission error: ${error}`;
      })

  };

  $scope.addInventory = function () {
    Inventory.addInventory($scope.inventory)
      .then(() => {
        $scope.message.inventory = "successfully submitted";
      })
      .catch(error => {
        $scope.message.inventory = `submission error: ${error}`;
      })
  };

  initializeCategories();

  $scope.getInventory = function(category) {
    $scope.category.name = category;
    Inventory.getAll($scope.category)
      .then(items => {
        $scope.data.inventory = items;
      })
  };

  // display none on render

  // reset() method that clears all fields needed here
});
