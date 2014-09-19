'use strict';

angular.module('letusgoAngularJsApp').service('CategoryService', function (localStorageService, ItemsService) {

  this.loadCategory = function () {
    var categorys = [];
    var items = ItemsService.get('itemsList') || [];

    for (var i = 0; i < items.length; i++) {
      if (categorys.indexOf(items[i].category) === -1) {
        categorys.push(items[i].category);
      }
    }
    ItemsService.add('categorys', categorys);
    return categorys;
  };

  this.addCategory = function (category) {
    var items = ItemsService.get('itemsList');
    var categorys = this.loadCategory();
    var newItem = {'category': category};

    items.push(newItem);
    categorys.push(category);
    ItemsService.add('itemsList', items);
    ItemsService.add('categorys', categorys);
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
