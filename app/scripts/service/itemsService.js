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

this.addToCart = function (item) {

    $http.get('/api/cartItems').success(function (data) {
      var cartList = data || [];
      var num = 1;
      var cart = {'item': item, 'num': num};

      var items = _.pluck(cartList, 'item');
      var ids = _.pluck(items, 'id');

      var exist = ids.indexOf(item.id);
      if (exist === -1) {
        cartList.push(cart);
      }
      else {
        _.forEach(cartList, function (existItem) {
          if (item.id === existItem.item.id) {
            existItem.num++;
          }
        })
      }
      $http.post('/api/cartItems', {cartItems: cartList});
    });
  };

  this.remove = function (){
    $http.delete('/api/cartItems');
  };

  this.add = function (key, value) {
    return localStorageService.set(key, value);
  };

  this.get = function (key) {
    return localStorageService.get(key);
  };
});
