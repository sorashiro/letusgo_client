'use strict';

angular.module('letusgoApp').service('GoodsInformationService', function ($http, $location, localStorageService, ItemsService) {

  this.addGoods = function(category, name, unit, price) {
    ItemsService.loadItems(function(data) {
      var items = data;
      var ids = _.pluck(items, 'id');
      var maxId = _.max(ids);
      var item = {category: category, name: name, unit: unit, price: price, id: maxId+1};

      items.push(item);
      $http.post('/api/items/', {items: items});
    });
  };

  this.remove = function (goodsInformation) {
    $http.delete('/api/items/' + goodsInformation.id);
  };

//  this.change = function (goodsInformation) {
//    var items = ItemsService.loadItems();
//    var item;
//
//    for (var i = 0; i < items.length; i++) {
//      if (goodsInformation.name === items[i].name) {
//        item = items[i];
//      }
//      ItemsService.add('modifyItem', item);
//    }
//  };
//
  this.changeItem = function(item) {
    var modifyItem = item;
    ItemsService.add('modifyItem', modifyItem);
  };

  this.getItem = function () {
    var item = ItemsService.get('modifyItem') || [];
    return item;
  };

//  this.getItem = function(callback) {
//    var item = this.change();
//    $http.get('/api/items/' + goodsInformation.id).success(function(data) {
//      callback(data);
//    })
//  };

//  this.modify = function (category, name, unit, price) {
//    var items = ItemsService.get('itemsList');
//    var item = this.getItem();
//    var newItem = {category: category, name: name, unit: unit, price: price};
//
//    for (var i = 0; i < items.length; i++) {
//      if (item.name === items[i].name) {
//        items.splice(i, 1, newItem);
//        break;
//      }
//    }
//    ItemsService.add('itemsList', items);
//  };
//});

  this.modify = function (item, category, name, unit, price) {
    var newItem = {category: category, name: name, unit: unit, price: price, id: item.id};

    $http.put('/api/items/' + item.id, {item: newItem});
  };

});
