'use strict';

describe('Controller: ItemsCtrl', function () {
  var ItemsService, $scope, createController;

  beforeEach(function () {
    module('letusgoAngularJsApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      ItemsService = $injector.get('ItemsService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('ItemsCtrl', {
          $scope: $scope,
          ItemsService: ItemsService
        });
      };
    });
  });
  it('should return all items to items', function () {
    spyOn(ItemsService, 'loadItems');
    createController();
    var items = ItemsService.loadItems();
    expect($scope.items).toEqual(items);
  });

  it('emit from parent controller', function() {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('parentCount');
    expect($scope.$emit).toHaveBeenCalledWith('parentItems');
  });

  it('count should be increase', function() {
    spyOn(ItemsService, 'count');
    createController();
    ItemsService.count();
    expect(ItemsService.count).toHaveBeenCalled();
  });

  it('item should be added to cart', function() {
    spyOn(ItemsService, 'addToCart');
    createController();
    var item = {'category': 'fruit', 'name': 'apple', 'unit': '斤', 'price': '5.50'};
    var cartList = [];
    var names = [];
    $scope.addToCart(item);
    expect(ItemsService.addToCart).toHaveBeenCalledWith(cartList, names, item);
  });

});
