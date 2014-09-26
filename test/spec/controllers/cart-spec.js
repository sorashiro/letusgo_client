'use strict';

describe('Controller: CartCtrl', function () {
  var ItemsService, $scope, createController, CartService, cartItem;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      ItemsService = $injector.get('ItemsService');
      CartService = $injector.get('CartItemService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('CartCtrl', {
          $scope: $scope,
          CartService: CartService,
          ItemsService: ItemsService
        });
      };
    });
    cartItem = [{category:'fruit',
                item:[{item:{category:'fruit',name:'apple',unit:'斤',price:'5.50'},
                       num:3}]}];
  });

//  it('emit from parent controller', function() {
//    spyOn($scope, '$emit');
//    createController();
//    expect($scope.$emit).toHaveBeenCalledWith('parentCart');
//  });
//
  it('should show cart list', function() {
    spyOn(CartService, 'showCartList').and.callFake(function(callback) {
      var cartList = cartItem;
      callback(cartList);
    });
    spyOn($scope, '$emit');
    createController();

    CartService.showCartList(function(data) {
      var cart = data;
      expect(cart).toEqual(data);
      expect($scope.$emit).toHaveBeenCalledWith('parentCart');
      expect($scope.pay).toEqual('小二算账');
      expect($scope.url).toEqual('#/pay');
    });
  });

  xit('should show correct route', function() {
    spyOn(CartService, 'category').and.returnValue(cartItem);
    createController();

    var categorys = [];
    var cartLists = [];
    var cartItems = CartService.category(categorys, cartLists);
    expect(cartItems).toBe(cartItem);
    expect($scope.pay).toBe('小二算账');
    expect($scope.url).toBe('#/pay');

  });

  xit('should show correct route', function() {
    spyOn(CartService, 'category').and.returnValue([]);
    createController();

    expect($scope.pay).toBe('返回商城');
    expect($scope.url).toBe('#/items');

  });
  it('quantity should reduce', function() {
    spyOn(ItemsService, 'reduceCount');
    spyOn(CartService, 'reduceNumber');
    createController();

    $scope.reduce(cartItem);
    expect(ItemsService.reduceCount).toHaveBeenCalled();
    expect(CartService.reduceNumber).toHaveBeenCalledWith(cartItem);
  });

  it('quantity should increase', function() {
    spyOn(ItemsService, 'count');
    spyOn(CartService, 'plusNumber');
    createController();

    $scope.plus(cartItem);
    expect(ItemsService.count).toHaveBeenCalled();
    expect(CartService.plusNumber).toHaveBeenCalledWith(cartItem);
  });
});
