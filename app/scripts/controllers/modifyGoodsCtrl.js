'use strict';

angular.module('letusgoApp').controller('ModifyGoodsCtrl', function ($scope, $location, CategoryService, GoodsInformationService) {

  $scope.$emit('parentManage');
  $scope.item = GoodsInformationService.getItem();

  CategoryService.loadCategories(function(data){
    $scope.categorys = data.category;
  });

  if($scope.item) {
    $scope.categoryName = $scope.item.category;
  }

  $scope.changeName = function (category) {
    $scope.categoryName = category;
  };

  $scope.modify = function () {
    var name = $scope.name;
    var unit = $scope.unit;
    var price = $scope.price;
    GoodsInformationService.modify($scope.categoryName, name, unit, price);
    alert('修改成功！');
  };
});
