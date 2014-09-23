'use strict';

angular.module('letusgoApp').service('CartItemService', function ($http, localStorageService) {

  this.loadCartItems = function (callback) {
    $http.get('/api/cartItems').success(function (data) {
      callback(data);
    });
  };


  this.reduceNumber = function (cartItem) {
    var cartLists;
    cartLists = localStorageService.get('cartList');
    var name;
    name = cartItem.name;

    for (var i = 0; i < cartLists.length; i++) {
      if (name === cartLists[i].item.name) {
        cartLists[i].num--;
        if (cartLists[i].num === 0) {
          cartLists.splice(i, 1);
        }
      }
    }
    localStorageService.set('cartList', cartLists);
  };

  this.plusNumber = function (cartItem) {
    var cartLists;
    cartLists = localStorageService.get('cartList');
    var name;
    name = cartItem.name;

    for (var i = 0; i < cartLists.length; i++) {
      if (name === cartLists[i].item.name) {
        cartLists[i].num++;
      }
    }
    localStorageService.set('cartList', cartLists);
  };

  this.getTotal = function () {
    var total = 0;
    var cartLists = localStorageService.get('cartList') || [];

    for (var i = 0; i < cartLists.length; i++) {
      total += cartLists[i].num * cartLists[i].item.price;
    }
    return total;
  };
});
