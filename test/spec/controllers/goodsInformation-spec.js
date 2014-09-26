'use strict';

describe('Controller: GoodsCtrl', function () {
  var $scope, createController, ItemsService, CategoryService, GoodsService;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      CategoryService = $injector.get('CategoryService');
      ItemsService = $injector.get('ItemsService');
      GoodsService = $injector.get('GoodsInformationService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('GoodsInformationCtrl', {
          $scope: $scope,
          ItemsService: ItemsService,
          GoodsService: GoodsService,
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

  it('should load goods information', function() {
    spyOn(ItemsService, 'loadItems').and.callFake(function(callback){
      var mockItems = [{'category': 'fruit', 'name': 'apple', 'unit': '斤', 'price': '5.50', id: 1}];
      callback(mockItems);
    });
    createController();
    ItemsService.loadItems(function(data){
      expect($scope.loadGoodsInformations).toEqual(data);
      expect(ItemsService.loadItems).toHaveBeenCalled();
    });
  });

  it('should load categories', function() {
    spyOn(CategoryService, 'loadCategories').and.callFake(function(callback){
      var categories = [{category: 'fruit', id: 1}];
      callback(categories);
    });

    createController();
    CategoryService.loadCategories = function(data){
      expect($scope.categorys).toEqual(data);
      expect(CategoryService.loadCategories).toHaveBeenCalled();
    };
  });

  it ('should get category name', function() {
    var category = {category: 'fruit', id: 1};
    createController();
    $scope.getName(category);
    expect($scope.categoryName).toBe(category.category);
  });

  it('should add new goods', function() {
    spyOn(GoodsService, 'addGoods');
    createController();
    $scope.name = 'origin';
    $scope.unit = '斤';
    $scope.price = '5.00';
    $scope.categoryName = 'food';

    $scope.addGoods();
    expect(GoodsService.addGoods).toHaveBeenCalledWith($scope.categoryName, $scope.name, $scope.unit, $scope.price);

  });

  it('should alert warning without information', function() {
    createController();
    $scope.addGoods();
  });

  it('should remove goods', function() {
    spyOn(GoodsService, 'remove');
    spyOn(ItemsService, 'loadItems');
    createController();

    $scope.remove();
    expect(GoodsService.remove).toHaveBeenCalled();
    expect(ItemsService.loadItems).toHaveBeenCalled();
  });

  xit('should modify goods', function() {
    spyOn(GoodsService, 'change');
    createController();

    $scope.change();
    expect(GoodsService.change).toHaveBeenCalled();
  });
});
