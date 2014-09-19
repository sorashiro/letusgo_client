'use strict';

angular.module('letusgoAngularJsApp').service('ItemsService', function (localStorageService) {

  this.items = function () {

    var itemsList = [
      {
        'category': 'fruit', 'name': 'apple', 'unit': '斤', 'price': '5.50'
      },
      {
        'category': 'fruit', 'name': 'leechee', 'unit': '斤', 'price': '15.00'
      },
      {
        'category': 'food', 'name': 'sprite', 'unit': '瓶', 'price': '3.00'
      },
      {
        'category': 'food', 'name': 'coca-cola', 'unit': '瓶', 'price': '3.00'
      },
      {
        'category': 'livingGoods', 'name': 'battery', 'unit': '个', 'price': '2.00'
      }
    ];
    localStorageService.set('itemsList', itemsList);
    localStorageService.set('newList', 0);
    return itemsList;
  };

  this.loadItems = function () {
    var item = localStorageService.get('itemsList') || [];
    for (var i = 0; i < item.length; i++) {
      if (!item[i].name) {
        item.splice(i, 1);
        i--;
      }
    }
    localStorageService.set('newList', item);
    return item;
  };

  this.count = function () {

    var count = this.get('clickcount') || 0;
    count++;

    this.add('clickcount', count);
    return count;

  };

  this.reduceCount = function(){
    var count = this.get('clickcount');
    count--;

    this.add('clickcount', count);
    return count;
  };

  this.addToCart = function (cartList, names, item) {

    var cart;
    var name = item.name;
    var num = 1;

    cart = {'item': item, 'num': num};
    names = this.get('names') || names;

    var has = names.indexOf(name);
    cartList = this.get('cartList') || cartList;
    if (has === -1) {
      cartList.push(cart);
      names.push(name);
    }
    else {
      for (var i = 0; i < cartList.length; i++) {
        if (cartList[i].item.name === name) {
          cartList[i].num++;
        }
      }
    }
    this.add('names', names);
    this.add('cartList', cartList);
  };

  this.add = function (key, value) {
    return localStorageService.set(key, value);
  };

  this.get = function (key) {
    return localStorageService.get(key);
  };

  this.remove = function (key) {
    return localStorageService.remove(key);
  };

});
