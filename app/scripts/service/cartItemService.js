'use strict';

angular.module('letusgoApp').service('CartItemService', function ($http) {

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

  this.reduceNumber = function (item) {
    $http.post('/api/cartItems/reduce', {id: item.id});
  };

  this.plusNumber = function (item) {
    $http.post('/api/cartItems/plus', {id: item.id});
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

  this.remove = function(callback) {
    this.loadCartItems(function (data) {
      var cartItems = data || [];

      $http.post('/api/cartItems/payment', {cartItems: cartItems}).success(function(data) {
        callback(data);
      })
    })
  };
});
