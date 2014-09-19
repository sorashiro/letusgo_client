'use strict';

angular.module('letusgoAngularJsApp').controller('PayCtrl', function ($scope, ItemsService, CartItemService) {

  $scope.date = new Date().toLocaleString();
  $scope.cartItems = ItemsService.get('cartList');
  $scope.total = CartItemService.getTotal();


  $scope.account = function () {

    ItemsService.remove('cartList');
    ItemsService.remove('names');
    ItemsService.add('clickcount', 0);

    $scope.$emit('parentCount');
    alert('付款成功，期待您下次光临~');
  };
});
