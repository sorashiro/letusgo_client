'use strict';

describe('Controller: ModifyCategoryCtrl', function () {
  var CategoryService, $scope, createController;

  beforeEach(function () {
    module('letusgoAngularJsApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CategoryService = $injector.get('CategoryService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('ModifyCategoryCtrl', {
          $scope: $scope,
          CategoryService: CategoryService
        });
      };
    });
  });

  it('emit from parent controller', function() {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('parentManage');
  });

  it('should get category name', function() {
    spyOn(CategoryService, 'getName');
    createController();

    expect(CategoryService.getName).toHaveBeenCalled();
  });

  it('modify category name', function() {
    spyOn(CategoryService, 'modifyCategory');
    spyOn(CategoryService, 'getName');
    createController();

    $scope.category = CategoryService.getName();
    $scope.modifyCategory();
    expect(CategoryService.modifyCategory).toHaveBeenCalled();
  });

});
