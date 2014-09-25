'use strict';

angular.module('letusgoApp').service('CartItemService', function ($http, localStorageService) {

  this.loadCartItems = function (callback) {
    $http.get('/api/cartItems').success(function (data) {
      callback(data);
    });
  };

  this.showCartList = function (callback) {
    this.loadCartItems(function (data) {
      var cartList = [];
      var cart = {};
      var cartItems = data || [];

      var items = _.pluck(cartItems, 'item');
      var categories = _.uniq(_.pluck(items, 'category'));

      _.forEach(categories, function (category) {
        var showItem = [];

        _.forEach(cartItems, function (cartItem) {
          if (category === cartItem.item.category) {
            showItem.push(cartItem);
          }
        });

        if (showItem.length !== 0) {
          cart = {category: category, item: showItem};
          cartList.push(cart);
        }
      });
      callback(cartList);
    })
  };

//  this.reduceNumber = function (cartItem) {
//    var cartLists;
//    cartLists = localStorageService.get('cartList');
//    var name;
//    name = cartItem.name;
//
//    for (var i = 0; i < cartLists.length; i++) {
//      if (name === cartLists[i].item.name) {
//        cartLists[i].num--;
//        if (cartLists[i].num === 0) {
//          cartLists.splice(i, 1);
//        }
//      }
//    }
//    localStorageService.set('cartList', cartLists);
//  };

  this.reduceNumber = function (item, callback) {
    this.loadCartItems(function(data) {
      var cartItems = data;
      var name = item.name;
      _.forEach(cartItems, function(cartItem) {
        if(name === cartItem.item.name) {
          cartItem.num--;
        }
      });
      $http.post('/api/cartItems/', {cartItems: cartItems}).success(function(data) {
        callback(data);
      })
    })
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

  this.getTotal = function (callback) {
    this.loadCartItems(function (data) {
      var total = 0;
      var cartItems = data || [];

      _.forEach(cartItems, function(cartItem) {
        total += cartItem.num * cartItem.item.price;
      });

      callback(total);
    })
  };
});
