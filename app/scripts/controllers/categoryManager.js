'use strict';

angular.module('letusgoAngularJsApp').controller('CategoryCtrl', function ($scope, CategoryService) {

  $scope.$emit('parentManage');
  $scope.categorys = CategoryService.loadCategory();

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
    $scope.categorys = CategoryService.loadCategory();

  };

  $scope.change = function (category) {
    CategoryService.modify(category);
  };

});
