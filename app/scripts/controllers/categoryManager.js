'use strict';

angular.module('letusgoApp').controller('CategoryCtrl', function ($scope, CategoryService) {

  $scope.$emit('parentManage');

  CategoryService.loadCategories(function(data){
    $scope.categorys = data;
  });

  $scope.addCategory = function () {
    var category = $scope.input;

    if (category) {
      CategoryService.addCategory(category);
      alert('添加成功~');
    }
    else {
      alert('请输入分类名称~');
    }
  };

  $scope.removes = function (category) {
    CategoryService.removes(category);
    CategoryService.loadCategories(function(data){
      $scope.categorys = data;
    });

  };

  $scope.change = function (category) {
    CategoryService.modify(category);
  };

});
