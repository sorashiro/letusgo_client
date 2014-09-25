'use strict';

angular.module('letusgoApp').controller('PayCtrl', function ($scope, ItemsService, CartItemService) {

  $scope.date = new Date().toLocaleString();
  CartItemService.loadCartItems(function (data) {
    $scope.cartItems = data;
  });

  CartItemService.getTotal(function(total) {
    $scope.total = total;
  });

  $scope.account = function () {
    CartItemService.remove(function(data) {
      $scope.cartItems = data;
    });

    ItemsService.add('clickcount', 0);
    $scope.$emit('parentCount');
  };
});
