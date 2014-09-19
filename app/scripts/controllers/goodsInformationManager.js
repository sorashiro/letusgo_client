'use strict';

angular.module('letusgoAngularJsApp').controller('GoodsInformationCtrl', function ($scope, ItemsService, CategoryService, GoodsInformationService) {

  $scope.$emit('parentManage');
  $scope.loadGoodsInformations = ItemsService.loadItems();
  $scope.categorys = CategoryService.loadCategory();
  $scope.categoryName = '分类名称';

  $scope.getName = function (category) {
    $scope.categoryName = category;
  };

  $scope.addGoods = function () {
    var name = $scope.name;
    var unit = $scope.unit;
    var price = $scope.price;
    if (name && unit && price && $scope.categoryName !== '分类名称') {
      GoodsInformationService.addGoods($scope.categoryName, name, unit, price);
      alert('添加成功~');
    }
    else {
      alert('请选择分类并输入名称、单位、价格～');
    }
  };

  $scope.remove = function (goodsInformation) {
    GoodsInformationService.remove(goodsInformation);
    $scope.loadGoodsInformations = ItemsService.loadItems();
  };

  $scope.change = function (goodsInformation) {
    GoodsInformationService.change(goodsInformation);
  };
});
