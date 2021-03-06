'use strict';

describe('Controller: PayCtrl', function () {
  var ItemsService, $scope, createController, CartService, cartList;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      ItemsService = $injector.get('ItemsService');
      CartService = $injector.get('CartItemService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('PayCtrl', {
          $scope: $scope,
          CartService: CartService,
          ItemsService: ItemsService
        });
      };
    });
    cartList = [{'category': 'fruit', 'name': 'apple', 'unit': '斤', 'price': '5.50'}];
  });

  it('should get cartList', function() {
    spyOn(ItemsService, 'get');
    createController();
    $scope.cartItems = ItemsService.get();
    expect(ItemsService.get).toHaveBeenCalled();
  });

  it('should load cart items', function() {
    spyOn(CartService, 'loadCartItems').and.callFake(function(callback){
      var cartItems = [{'item': {'category': 'fruit', 'name': 'apple', 'unit': '斤', 'price': '5.50', id: 1}, 'num': 1}];
      callback(cartItems);
    });
    createController();
    CartService.loadCartItems(function(data) {
      expect($scope.cartItems).toEqual(data);
      expect(CartService.loadCartItems).toHaveBeenCalled();
    })
  });

  it('should get total', function() {
    spyOn(CartService, 'getTotal').and.callFake(function(callback){
      var total = 5.50;
      callback(total);
    });
    createController();
    CartService.getTotal(function(data){
      expect($scope.total).toEqual(data);
      expect(CartService.getTotal).toHaveBeenCalled();
    });
  });

  it('success to pay', function() {
    spyOn(ItemsService, 'remove').and.callFake(function(callback) {
      var cartItems = [];
      callback(cartItems);
    });
    spyOn(ItemsService, 'add');
    spyOn($scope, '$emit');
    createController();
    $scope.account();
    CartService.remove(function(data) {
      expect($scope.cartItems).toEqual(data);
      expect(ItemsService.add).toHaveBeenCalled();
      expect($scope.$emit).toHaveBeenCalledWith('parentCount');
    });
  });
});
