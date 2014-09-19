'use strict';

angular.module('letusgoAngularJsApp')
  .controller('IndexCtrl', function ($scope, ItemsService) {

    ItemsService.items();

    $scope.$emit('parentHome');
    $scope.$emit('parentCount');

    $scope.$on('parentCount', function () {
      $scope.count = ItemsService.get('clickcount') || 0;
    });


    $scope.$on('parentHome', function() {
      $scope.homeStyle = 'active';
      $scope.cartStyle = '0';
      $scope.manageStyle = '0';
      $scope.itemsStyle = '0';
    });

    $scope.$on('parentItems', function() {
      $scope.homeStyle = '0';
      $scope.cartStyle = '0';
      $scope.manageStyle = '0';
      $scope.itemsStyle = 'active';
    });

    $scope.$on('parentCart', function() {
      $scope.homeStyle = '0';
      $scope.itemsStyle = '0';
      $scope.manageStyle = '0';
      $scope.cartStyle = 'active';
    });

    $scope.$on('parentManage', function() {
      $scope.homeStyle = '0';
      $scope.itemsStyle = '0';
      $scope.cartStyle = '0';
      $scope.manageStyle = 'active';
    });

  });

