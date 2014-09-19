'use strict';

angular.module('letusgoAngularJsApp').controller('CartCtrl', function ($scope, CartItemService, ItemsService) {

  var categorys = [];
  var cartLists = [];
  var cartItems = CartItemService.category(categorys, cartLists);

  $scope.$emit('parentCart');

  if (cartItems.length === 0) {
    $scope.pay = '返回商城';
    $scope.url = '#/items';
  }
  else {
    $scope.cartItems = cartItems;
    $scope.pay = '小二算账';
    $scope.url = '#/pay';

  }

  $scope.reduce = function (cartItem) {
    ItemsService.reduceCount();
    $scope.$emit('parentCount');

    CartItemService.reduceNumber(cartItem);
    $scope.cartItems = CartItemService.category(categorys, cartLists);
  };

  $scope.plus = function (cartItem) {
    ItemsService.count();
    $scope.$emit('parentCount');

    CartItemService.plusNumber(cartItem);
    $scope.cartItems = CartItemService.category(categorys, cartLists);
  };

});
