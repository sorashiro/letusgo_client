'use strict';

angular.module('letusgoApp').service('CategoryService', function ($http, localStorageService, ItemsService) {

  this.loadCategories = function (callback) {
    $http.get('/api/categories').success(function (data) {
      callback(data);
    });
  };

  this.addCategory = function(category) {

    this.loadCategories(function(data) {
      var categories = data;
      var ids = _.pluck(categories, 'id');
      var maxId = _.max(ids);

      categories.push({category: category, id: maxId+1});
      $http.post('/api/categories', {categories: categories});
    })
  };

  this.removes = function (category) {
    var items = ItemsService.get('itemsList');

    for (var i = 0; i < items.length; i++) {
      if (category === items[i].category) {
        if (items[i].name) {
          alert('该分类下有商品，不能删除！');
          break;
        }
        else {
          items.splice(i, 1);
          i--;
        }
      }
    }
    ItemsService.add('itemsList', items);
  };

  this.modify = function (category) {
    var categoryName = category;
    ItemsService.add('modifyCategory', categoryName);
  };

  this.getName = function () {
    var category = ItemsService.get('modifyCategory');
    return category;
  };

  this.modifyCategory = function (category, newName) {
    var items = ItemsService.get('itemsList');

    for (var i = 0; i < items.length; i++) {
      if (category === items[i].category) {
        items[i].category = newName;
      }
    }
    ItemsService.add('itemsList', items);
  };

});
