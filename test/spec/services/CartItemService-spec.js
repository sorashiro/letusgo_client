'use strict';

describe('Controller: CartService', function () {
  var $scope, localStorageService, CartService, cartList, cartItem;

  beforeEach(function () {
    module('letusgoAngularJsApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      localStorageService = $injector.get('localStorageService');
      CartService = $injector.get('CartItemService');
    });

    cartList = [{'item':{'category':'fruit','name':'apple','unit':'斤','price':'5.50'},'num':1}];
    cartItem = [{'category':'fruit','item':[{'item':{'category':'fruit','name':'apple','unit':'斤','price':'5.50'},'num':1}]}];
  });

  it('should return cartList', function() {
    spyOn(localStorageService, 'get').andReturn(cartList);
    var cartLists = CartService.cartList();

    expect(cartLists).toBe(cartList);
    expect(localStorageService.get).toHaveBeenCalledWith('cartList');
  });

  it('should return cartItems', function() {
    spyOn(localStorageService, 'get');
    var categories = [];
    var cartItems = CartService.category(categories, cartList);

    expect(cartItems).toEqual(cartItem);
    expect(localStorageService.get).toHaveBeenCalled();
  });

  it('should reduce number', function() {
    spyOn(localStorageService, 'get').andReturn(cartList);
    spyOn(localStorageService, 'set');
    CartService.reduceNumber(cartItem);

    expect(localStorageService.get).toHaveBeenCalled();
    expect(localStorageService.set).toHaveBeenCalled();
  });

  it('should increase number', function() {
    spyOn(localStorageService, 'get').andReturn(cartList);
    spyOn(localStorageService, 'set');
    CartService.plusNumber(cartItem);

    expect(localStorageService.get).toHaveBeenCalled();
    expect(localStorageService.set).toHaveBeenCalled();
  });

  it('should get total', function() {
    spyOn(localStorageService, 'get').andReturn(cartList);
    var total = CartService.getTotal();

    expect(localStorageService.get).toHaveBeenCalled();
    expect(total).toEqual(5.50);
  });
});
