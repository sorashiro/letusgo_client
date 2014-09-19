'use strict';

angular.module('letusgoAngularJsApp').service('CartItemService', function (localStorageService) {

  this.cartList = function (cartLists) {
    cartLists = localStorageService.get('cartList');
    return cartLists;
  };

  this.category = function (categorys, cartLists) {
    var cartItems = [];
    var category = {};
    cartLists = localStorageService.get('cartList') || cartLists;

    for (var i = 0; i < cartLists.length; i++) {
      category = cartLists[i].item.category;
      if (categorys.indexOf(category) === -1) {
        categorys.push(category);
      }
    }

    for (var k = 0; k < categorys.length; k++) {
      var item = [];
      for (var j = 0; j < cartLists.length; j++) {
        if (categorys[k] === cartLists[j].item.category) {
          item.push(cartLists[j]);
        }
      }
      if (item.length !== 0) {
        category = {'category': categorys[k], 'item': item};
        cartItems.push(category);
        localStorageService.set('cartItem', cartItems);
        localStorageService.set(categorys[k], category);
      }
    }
    return cartItems;
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
