'use strict';

angular.module('letusgoApp').controller('ModifyGoodsCtrl', function ($scope, $location, CategoryService, GoodsInformationService) {

  $scope.$emit('parentManage');
  $scope.item = GoodsInformationService.getItem();

  CategoryService.loadCategories(function(data){
    $scope.categorys = data;
  });

  if($scope.item) {
    $scope.categoryName = $scope.item.category;
  }

  $scope.changeName = function (category) {
    $scope.categoryName = category.category;
  };

  $scope.modify = function () {
    var name = $scope.name;
    var unit = $scope.unit;
    var price = $scope.price;
    GoodsInformationService.modify($scope.item, $scope.categoryName, name, unit, price);
  };
});
