'use strict';

angular.module('letusgoApp').controller('ItemsCtrl', function ($scope, ItemsService) {

  var cartList = [];
  var names = [];

  ItemsService.loadItems(function(data) {
      $scope.items = data
  });

  $scope.$emit('parentCount');
  $scope.$emit('parentItems');

  $scope.addToCart = function (item) {

    ItemsService.count();
    $scope.$emit('parentCount');

    ItemsService.addToCart(item);
  };
});
