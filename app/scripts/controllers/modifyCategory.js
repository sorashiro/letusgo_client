'use strict';

angular.module('letusgoAngularJsApp').controller('ModifyCategoryCtrl', function ($scope, CategoryService) {

  $scope.$emit('parentManage');
  $scope.category = CategoryService.getName();

  $scope.modifyCategory = function () {
    var newName = $scope.input;
    CategoryService.modifyCategory($scope.category, newName);
    alert('修改成功！');
  };
});
