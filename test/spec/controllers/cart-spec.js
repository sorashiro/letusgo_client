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
      expect($scope.cartItems).toEqual(data);
      expect($scope.$emit).toHaveBeenCalledWith('parentCart');
      expect($scope.pay).toEqual('小二算账');
      expect($scope.url).toEqual('#/pay');
    });
  });

  it('should show correct route', function() {
    spyOn(CartService, 'showCartList').and.callFake(function(callback) {
      var cartList = [];
      callback(cartList);
    });
    spyOn($scope, '$emit');
    createController();

    CartService.showCartList(function(data) {
      var cart = data;
      expect(cart).toEqual(data);
      expect($scope.$emit).toHaveBeenCalledWith('parentCart');
      expect($scope.pay).toEqual('返回商城');
      expect($scope.url).toEqual('#/items');
    });
  });

  it('quantity should reduce', function() {
    spyOn(ItemsService, 'reduceCount');
    spyOn($scope, '$emit');
    spyOn(CartService, 'reduceNumber');
    spyOn(CartService, 'showCartList').and.callFake(function(callback) {
      var cartList = cartItem;
        callback(cartList);
    });
    createController();

    $scope.reduce(cartItem);
    CartService.showCartList(function(data) {
      expect($scope.cartItems).toEqual(data);
    });
    expect($scope.$emit).toHaveBeenCalledWith('parentCount');
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
