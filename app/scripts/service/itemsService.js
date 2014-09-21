'use strict';

angular.module('letusgoApp').service('ItemsService', function ($http, localStorageService) {

  this.loadItems = function (callback) {
    $http.get('/api/items').success(function (data) {
      callback(data);
    });
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
