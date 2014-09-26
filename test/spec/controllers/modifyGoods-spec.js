'use strict';

describe('Controller: ModifyGoodsCtrl', function () {
  var $scope, createController, CategoryService, GoodsService, ItemsService, modifyItem;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CategoryService = $injector.get('CategoryService');
      ItemsService = $injector.get('ItemsService');
      GoodsService = $injector.get('GoodsInformationService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('ModifyGoodsCtrl', {
          $scope: $scope,
          ItemsService: ItemsService,
          GoodsService: GoodsService,
          CategoryService: CategoryService
        });
      };
    });
    modifyItem = {'category':'fruit','name':'leechee','unit':'斤','price':'15.00'};
  });

  it('emit from parent controller', function() {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('parentManage');
  });

  it('should get item', function() {
    spyOn(GoodsService, 'getItem');
    createController();
    expect(GoodsService.getItem).toHaveBeenCalled();
  });

  it('should load categories name', function() {
    spyOn(CategoryService, 'loadCategories').and.callFake(function(callback){
      var mockCategories = [{category: 'fruit', id: 1}];
      callback(mockCategories);
    });
    createController();
    CategoryService.loadCategories = function(data){
      expect($scope.categorys).toEqual(data);
      expect(CategoryService.loadCategory).toHaveBeenCalled();
    };
  });

  it('shoude get category name', function() {
    createController();
    var item = {'category':'fruit','name':'leechee','unit':'斤','price':'15.00'};
    $scope.categoryName = item.category;
    expect($scope.categoryName).toBe('fruit');
  });

  it('should change category name', function() {
    createController();
    var category = {category: 'fruit', id: 1};
    $scope.changeName(category);

    expect($scope.categoryName).toEqual('fruit');
  });

  it('should get category name', function() {
    $scope.item = {'category':'fruit','name':'leechee','unit':'斤','price':'15.00', id: 1};
    $scope.categoryName = $scope.item.category;
    expect($scope.categoryName).toEqual('fruit');
  });

  it('should modify goods information', function() {
    spyOn(GoodsService,'modify');
    createController();
    $scope.modify();

    expect(GoodsService.modify).toHaveBeenCalled();
  });

});
