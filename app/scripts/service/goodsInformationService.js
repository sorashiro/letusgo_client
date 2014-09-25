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

  this.changeItem = function(item) {
    var modifyItem = item;
    ItemsService.add('modifyItem', modifyItem);
  };

  this.getItem = function () {
    var item = ItemsService.get('modifyItem') || [];
    return item;
  };

  this.modify = function (item, category, name, unit, price) {
    var newItem = {category: category, name: name, unit: unit, price: price, id: item.id};

    $http.put('/api/items/' + item.id, {item: newItem});
  };

});
