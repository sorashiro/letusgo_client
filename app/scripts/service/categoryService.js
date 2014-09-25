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

  this.removes = function(category) {
      $http.delete('/api/categories/' + category.id);
  };

  this.modify = function (category) {
    var categoryName = category;
    ItemsService.add('modifyCategory', categoryName);
  };

  this.getName = function () {
    var category = ItemsService.get('modifyCategory');
    return category;
  };

  this.modifyCategory = function(category, newName) {
    category = {category: newName, id: category.id};
    $http.put('/api/categories/' + category.id, {category: category});
  }

});
