'use strict';

describe('Controller: ItemsService', function () {
  var $scope, localStorageService, ItemsService, items;

  beforeEach(function () {
    module('letusgoAngularJsApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      localStorageService = $injector.get('localStorageService');
      ItemsService = $injector.get('ItemsService');
    });

    var item1 = {'category': 'fruit', 'name': 'apple', 'unit': '斤', 'price': '5.50'};
    var item2 = {'category': 'fruit', 'name': 'leechee', 'unit': '斤', 'price': '15.00'};
    var item3 = {'category': 'food', 'name': 'sprite', 'unit': '瓶', 'price': '3.00'};
    var item4 = {'category': 'food', 'name': 'coca-cola', 'unit': '瓶', 'price': '3.00'};
    var item5 = {'category': 'livingGoods', 'name': 'battery', 'unit': '个', 'price': '2.00'};
    var item6 = {'category': 'book'};
    items = [item1, item2, item3, item4, item5, item6];
  });

  it('should return itemsList', function() {
    spyOn(localStorageService, 'set');
    var items = ItemsService.items();
    expect(localStorageService.set).toHaveBeenCalled();
    expect(items.length).toBe(5);
    expect(items[0].name).toBe('apple');
    expect(items[2].name).toBe('sprite');
    expect(items[4].name).toBe('battery');
  });

  it('should load items', function() {
    spyOn(localStorageService, 'get').andReturn(items);
    spyOn(localStorageService, 'set');
    var itemsList = ItemsService.loadItems();

    expect(localStorageService.set).toHaveBeenCalled();
    expect(localStorageService.get).toHaveBeenCalled();
    expect(itemsList.length).toBe(5);
  });

  it('should increase count', function() {
    spyOn(ItemsService, 'get').andReturn(1);
    spyOn(ItemsService, 'add');
    var count = ItemsService.count();

    expect(count).toBe(2);
    expect(ItemsService.get).toHaveBeenCalled();
    expect(ItemsService.add).toHaveBeenCalled();
  });

  it('should reduce count', function() {
    spyOn(ItemsService, 'add');
    spyOn(ItemsService, 'get').andReturn(3);
    var count = ItemsService.reduceCount();

    expect(count).toBe(2);
    expect(ItemsService.add).toHaveBeenCalled();
    expect(ItemsService.get).toHaveBeenCalled();
  });

  it('should add to cart', function() {
    spyOn(ItemsService, 'get');
    spyOn(ItemsService, 'add');
    var cartList = [];
    var names = [];
    ItemsService.addToCart(cartList, names, items);

    expect(ItemsService.get).toHaveBeenCalled();
    expect(ItemsService.add).toHaveBeenCalled();
  });

  it('should only increase num', function() {
    var cartList = [{'item':{'category':'fruit','name':'apple','unit':'斤',price:'5.50'},num:1}];
    var item = items[0];
    var names = ['apple'];
    spyOn(ItemsService, 'get');
    spyOn(ItemsService, 'add');
    ItemsService.addToCart(cartList, names, item);

    expect(cartList[0].num).toBe(2);
  });

  it('should use localStorageService set function', function() {
    spyOn(localStorageService, 'set');
    ItemsService.add();
    expect(localStorageService.set).toHaveBeenCalled();
  });

  it('should use localStorageService get function', function(){
    spyOn(localStorageService, 'get');
    ItemsService.get();

    expect(localStorageService.get).toHaveBeenCalled();
  });

  it('should use localStorageService remove function', function() {
    spyOn(localStorageService, 'remove');
    ItemsService.remove();

    expect(localStorageService.remove).toHaveBeenCalled();
  });
});
