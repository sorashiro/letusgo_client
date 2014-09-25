'use strict';

angular.module('letusgoApp').controller('GoodsInformationCtrl', function ($scope, ItemsService, CategoryService, GoodsInformationService) {

  $scope.$emit('parentManage');

  ItemsService.loadItems(function(data) {
    $scope.loadGoodsInformations = data;
  });

  CategoryService.loadCategories(function(data){
    $scope.categorys = data;
  });
  $scope.categoryName = '分类名称';

  $scope.getName = function (category) {
    $scope.categoryName = category.category;
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
    ItemsService.loadItems(function(data) {
      $scope.loadGoodsInformations = data;
    });
  };

  $scope.change = function (goodsInformation) {
    GoodsInformationService.changeItem(goodsInformation);
  };

});
