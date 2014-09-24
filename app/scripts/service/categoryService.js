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

//  this.removes = function (category) {
//    var items = ItemsService.get('itemsList') || [];
//
//    for (var i = 0; i < items.length; i++) {
//      if (category === items[i].category) {
//        if (items[i].name) {
//          alert('该分类下有商品，不能删除！');
//          break;
//        }
//        else {
//          items.splice(i, 1);
//          i--;
//        }
//      }
//    }
//    ItemsService.add('itemsList', items);
//  };

  function existItem(category, callback) {
    var items = ItemsService.loadItems();

      _.forEach(items, function (item) {
        if (category.category === item.category) {
          alert('该分类下有商品，不能删除~');
          return false;
        }
        else{
          callback(true);
        }
      });
    }

//  this.removes = function (category) {
//
//    ItemsService.loadItems(function (data) {
//      var items = data;
//
//      _.forEach(items, function(item) {
//        if(category.category === item.category) {
//          alert('该分类下有商品，不能删除~');
//          return false;
//        }
//        else {
//          $http.delete('/api/categories/' + category.id);
//        }
//      })
//    });
//  };

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

  this.modifyCategory = function (category, newName) {
    var items = ItemsService.get('itemsList');

    for (var i = 0; i < items.length; i++) {
      if (category === items[i].category) {
        items[i].category = newName;
      }
    }
    ItemsService.add('itemsList', items);
  };

  this.modifyCategory = function(category, newName, callback) {
    console.log(category);
    category = {category: newName, id: category.id};
    $http.put('/api/categories/' + category.id, {category: category}).success(function(data) {
      callback(data);
    })
  }

});
