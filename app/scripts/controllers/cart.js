'use strict';

angular.module('letusgoApp').controller('CartCtrl', function ($scope, CartItemService, ItemsService) {

  CartItemService.showCartList(function(cartList) {

    $scope.$emit('parentCart');
    var cart = cartList;

    if (cart.length === 0) {
      $scope.pay = '返回商城';
      $scope.url = '#/items';
    }
    else {
      $scope.cartItems = cartList;
      $scope.pay = '小二算账';
      $scope.url = '#/pay';
    }
  });

  $scope.reduce = function (cartItem) {
    ItemsService.reduceCount();
    $scope.$emit('parentCount');

    CartItemService.reduceNumber(cartItem);
    CartItemService.showCartList(function(cartList) {
      $scope.cartItems = cartList;
    });
  };

  $scope.plus = function (cartItem) {
    ItemsService.count();
    $scope.$emit('parentCount');

    CartItemService.plusNumber(cartItem);
    CartItemService.showCartList(function(cartList) {
      $scope.cartItems = cartList;
    });
  };

});
