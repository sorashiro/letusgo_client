'use strict';

angular.module('letusgoAngularJsApp').service('GoodsInformationService', function (localStorageService, ItemsService) {

  this.addGoods = function (category, name, unit, price) {
    var items = ItemsService.get('itemsList');
    items.push({'category': category, 'name': name, 'unit': unit, 'price': price});
    ItemsService.add('itemsList', items);
  };

  this.remove = function (goodsInformation) {
    var items = ItemsService.get('itemsList');

    for (var i = 0; i < items.length; i++) {
      if (goodsInformation.name === items[i].name) {
        items.splice(i, 1);
      }
    }
    ItemsService.add('itemsList', items);
  };

  this.change = function (goodsInformation) {
    var items = ItemsService.loadItems();
    var item;

    for (var i = 0; i < items.length; i++) {
      if (goodsInformation.name === items[i].name) {
        item = items[i];
      }
      ItemsService.add('modifyItem', item);
    }
  };

  this.getItem = function () {
    var item = ItemsService.get('modifyItem') || [];
    return item;
  };

  this.modify = function (category, name, unit, price) {
    var items = ItemsService.get('itemsList');
    var item = this.getItem();
    var newItem = {'category': category, 'name': name, 'unit': unit, 'price': price};

    for (var i = 0; i < items.length; i++) {
      if (item.name === items[i].name) {
        items.splice(i, 1, newItem);
        break;
      }
    }
    ItemsService.add('itemsList', items);
  };
});
