'use strict';

angular.module('letusgoApp').controller('ItemsCtrl', function ($scope, ItemsService) {

  var cartList = [];
  var names = [];

  $scope.items = ItemsService.loadItems();
  $scope.$emit('parentCount');
  $scope.$emit('parentItems');

  $scope.addToCart = function (item) {

    ItemsService.count();
    $scope.$emit('parentCount');

    ItemsService.addToCart(cartList, names, item);
  };
});
