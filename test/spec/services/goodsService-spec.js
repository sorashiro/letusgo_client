'use strict';

describe('Controller: GoodsService', function () {
  var $scope, localStorageService, GoodsService, ItemsService, itemsList, items, goodsInformation, modifyItem;

  beforeEach(function () {
    module('letusgoAngularJsApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      localStorageService = $injector.get('localStorageService');
      ItemsService = $injector.get('ItemsService');
      GoodsService = $injector.get('GoodsInformationService');
    });

    itemsList = [
      {'category': 'fruit', 'name': 'apple', 'unit': '斤', 'price': '5.50'},
      {'category': 'fruit', 'name': 'leechee', 'unit': '斤', 'price': '15.00'},
      {'category': 'food', 'name': 'sprite', 'unit': '瓶', 'price': '3.00'},
      {'category': 'food', 'name': 'coca-cola', 'unit': '瓶', 'price': '3.00'},
      {'category': 'livingGoods', 'name': 'battery', 'unit': '个', 'price': '2.00'},
      {'category': 'book'}
    ];
    items = [
      {'category': 'fruit', 'name': 'apple', 'unit': '斤', 'price': '5.50'},
      {'category': 'fruit', 'name': 'leechee', 'unit': '斤', 'price': '15.00'},
      {'category': 'food', 'name': 'sprite', 'unit': '瓶', 'price': '3.00'},
      {'category': 'food', 'name': 'coca-cola', 'unit': '瓶', 'price': '3.00'},
      {'category': 'livingGoods', 'name': 'battery', 'unit': '个', 'price': '2.00'}
    ];
    goodsInformation = {'category':'fruit','name':'apple','unit':'斤','price':'5.50'};
    modifyItem = {'category':'fruit','name':'apple','unit':'斤','price':'5.50'};
  });

  it('should add goods information', function() {
    var category = 'food';
    var name = 'cake';
    var unit = '个';
    var price = '10.00';
    spyOn(ItemsService, 'get').andReturn(itemsList);
    spyOn(ItemsService, 'add');

    GoodsService.addGoods(category, name, unit, price);

    expect(ItemsService.get).toHaveBeenCalledWith('itemsList');
    expect(ItemsService.add).toHaveBeenCalled();
    expect(itemsList).toEqual([
      {'category': 'fruit', 'name': 'apple', 'unit': '斤', 'price': '5.50'},
      {'category': 'fruit', 'name': 'leechee', 'unit': '斤', 'price': '15.00'},
      {'category': 'food', 'name': 'sprite', 'unit': '瓶', 'price': '3.00'},
      {'category': 'food', 'name': 'coca-cola', 'unit': '瓶', 'price': '3.00'},
      {'category': 'livingGoods', 'name': 'battery', 'unit': '个', 'price': '2.00'},
      {'category': 'book'},
      {'category': 'food', 'name': 'cake', 'unit': '个', 'price': '10.00'}
    ]);
  });

  it('should remove goods', function() {
    spyOn(ItemsService, 'get').andReturn(itemsList);
    spyOn(ItemsService, 'add');

    GoodsService.remove(goodsInformation);

    expect(ItemsService.get).toHaveBeenCalledWith('itemsList');
    expect(ItemsService.add).toHaveBeenCalled();
    expect(itemsList).toEqual([
      {'category': 'fruit', 'name': 'leechee', 'unit': '斤', 'price': '15.00'},
      {'category': 'food', 'name': 'sprite', 'unit': '瓶', 'price': '3.00'},
      {'category': 'food', 'name': 'coca-cola', 'unit': '瓶', 'price': '3.00'},
      {'category': 'livingGoods', 'name': 'battery', 'unit': '个', 'price': '2.00'},
      {'category': 'book'}
    ]);
  });

  it('should change goods', function() {
    spyOn(ItemsService, 'loadItems').andReturn(items);
    spyOn(ItemsService, 'add');

    GoodsService.change(goodsInformation);

    expect(ItemsService.add).toHaveBeenCalled();
    expect(ItemsService.loadItems).toHaveBeenCalled();
  });

  it('should get item',function() {
    spyOn(ItemsService, 'get').andReturn(modifyItem);
    var item = GoodsService.getItem();

    expect(ItemsService.get).toHaveBeenCalledWith('modifyItem');
    expect(item).toEqual(modifyItem);
  });

  it('should modify goods information', function() {
    spyOn(ItemsService, 'add');
    spyOn(ItemsService, 'get').andReturn(itemsList);
    spyOn(GoodsService, 'getItem').andReturn(modifyItem);
    var category = 'food';
    var name = 'cake';
    var unit = '个';
    var price = '10.00';

    GoodsService.modify(category, name, unit, price);

    expect(ItemsService.get).toHaveBeenCalledWith('itemsList');
    expect(GoodsService.getItem).toHaveBeenCalled();
    expect(ItemsService.add).toHaveBeenCalled();
    expect(itemsList).toEqual([
      {'category': 'food', 'name': 'cake', 'unit': '个', 'price': '10.00'},
      {'category': 'fruit', 'name': 'leechee', 'unit': '斤', 'price': '15.00'},
      {'category': 'food', 'name': 'sprite', 'unit': '瓶', 'price': '3.00'},
      {'category': 'food', 'name': 'coca-cola', 'unit': '瓶', 'price': '3.00'},
      {'category': 'livingGoods', 'name': 'battery', 'unit': '个', 'price': '2.00'},
      {'category': 'book'}
    ]);

  });
});
