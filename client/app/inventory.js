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
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.addCategory = function() {
    Category.addCategory($scope.category)
      .then(function() {
        $scope.message.category = "successfully submitted";
        initializeCategories();
      })
      .catch(function(error) {
        $scope.message.category = 'submission error:' + error;
      })

  };

  $scope.addInventory = function () {
    Inventory.addInventory($scope.inventory)
      .then(function() {
        $scope.message.inventory = "successfully submitted";
      })
      .catch(function(error) {
        $scope.message.inventory = 'submission error:' + error;
      })
  };

  initializeCategories();

  $scope.getInventory = function(category) {
    $scope.category.name = category;
    Inventory.getAll($scope.category)
      .then(function(items) {
        items.filter(function(item) {
          $scope.category === item.category;
        })
        $scope.data.inventory = items;
      })
  };
});
