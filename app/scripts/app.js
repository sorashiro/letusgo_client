'use strict';

angular
  .module('letusgoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'IndexCtrl'
      })
      .when('/items', {
        templateUrl: 'views/items.html',
        controller: 'ItemsCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl'
      })
      .when('/pay', {
        templateUrl: 'views/pay.html',
        controller: 'PayCtrl'
      })
      .when('/categoryManager', {
        templateUrl: 'views/categoryManager.html',
        controller: 'CategoryCtrl'
      })
      .when('/goodsInformationManager', {
        templateUrl: 'views/goodsInformationManager.html',
        controller: 'GoodsInformationCtrl'
      })
      .when('/addCategory', {
        templateUrl: 'views/addCategory.html',
        controller: 'CategoryCtrl'
      })
      .when('/addGoods', {
        templateUrl: 'views/addGoods.html',
        controller: 'GoodsInformationCtrl'
      })
      .when('/modifyCategory', {
        templateUrl: 'views/modifyCategory.html',
        controller: 'ModifyCategoryCtrl'
      })
      .when('/modifyGoodsInformation', {
        templateUrl: 'views/modifyGoodsInformation.html',
        controller: 'ModifyGoodsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
