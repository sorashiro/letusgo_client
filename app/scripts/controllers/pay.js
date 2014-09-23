'use strict';

angular.module('letusgoApp').controller('PayCtrl', function ($scope, ItemsService, CartItemService) {

  $scope.date = new Date().toLocaleString();
  $scope.cartItems = ItemsService.get('cartList');

  CartItemService.getTotal(function(total) {
    $scope.total = total;
  });


  $scope.account = function () {

    ItemsService.remove('cartList');
    ItemsService.remove('names');
    ItemsService.add('clickcount', 0);

    $scope.$emit('parentCount');
    alert('付款成功，期待您下次光临~');
  };
});
