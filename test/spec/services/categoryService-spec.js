'use strict';

describe('Controller: CategoryService', function () {
  var $scope, localStorageService, CategoryService, ItemsService, itemsList, categories;

  beforeEach(function () {
    module('letusgoAngularJsApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      localStorageService = $injector.get('localStorageService');
      ItemsService = $injector.get('ItemsService');
      CategoryService = $injector.get('CategoryService');
    });

    itemsList = [
      {'category':'fruit','name':'apple','unit':'斤','price':'5.50'},
      {'category':'fruit','name':'leechee','unit':'斤','price':'15.00'},
      {'category':'food','name':'sprite','unit':'瓶','price':'3.00'},
      {'category':'food','name':'coca-cola','unit':'瓶','price':'3.00'},
      {'category':'livingGoods','name':'battery','unit':'个','price':'2.00'},
      {'category':'book'}];
    categories = ['fruit','food','livingGoods'];
  });

  it('should load category', function() {
    spyOn(ItemsService, 'get').andReturn(itemsList);
    spyOn(ItemsService, 'add');
    var categories = CategoryService.loadCategory();
    expect(ItemsService.get).toHaveBeenCalledWith('itemsList');
    expect(categories).toEqual(categories);
  });

  it('should add new category', function() {
    var category = 'book';
    spyOn(ItemsService, 'get').andReturn(itemsList);
    spyOn(CategoryService, 'loadCategory').andReturn(categories);
    spyOn(ItemsService, 'add');

    CategoryService.addCategory(category);

    expect(ItemsService.get).toHaveBeenCalledWith('itemsList');
    expect(ItemsService.add).toHaveBeenCalled();
    expect(categories).toEqual(['fruit','food','livingGoods','book']);

  });

  it('can not remove old category', function() {
    var category = 'food';
    spyOn(ItemsService, 'get').andReturn(itemsList);
    spyOn(ItemsService, 'add');

    CategoryService.removes(category);

    expect(ItemsService.get).toHaveBeenCalledWith('itemsList');
    expect(ItemsService.add).toHaveBeenCalled();

  });

  it('can remove old category', function() {
    var category = 'book';
    spyOn(ItemsService, 'get').andReturn(itemsList);
    spyOn(ItemsService, 'add');

    CategoryService.removes(category);
    var item = [
      {'category':'fruit','name':'apple','unit':'斤','price':'5.50'},
      {'category':'fruit','name':'leechee','unit':'斤','price':'15.00'},
      {'category':'food','name':'sprite','unit':'瓶','price':'3.00'},
      {'category':'food','name':'coca-cola','unit':'瓶','price':'3.00'},
      {'category':'livingGoods','name':'battery','unit':'个','price':'2.00'}];

    expect(ItemsService.get).toHaveBeenCalledWith('itemsList');
    expect(ItemsService.add).toHaveBeenCalled();
    expect(itemsList).toEqual(item);
  });

  it('should get modify category', function() {
    var category = 'book';
    spyOn(ItemsService, 'add');

    CategoryService.modify(category);

    expect(ItemsService.add).toHaveBeenCalled();
  });

  it('should get category name', function() {
    spyOn(ItemsService, 'get').andReturn('book');
    var category = CategoryService.getName();

    expect(category).toEqual('book');
    expect(ItemsService.get).toHaveBeenCalled();
  });

  it('should modify category', function() {
    spyOn(ItemsService, 'add');
    spyOn(ItemsService, 'get').andReturn(itemsList);
    var category = 'book';
    var newName = 'toy';
    CategoryService.modifyCategory(category, newName);

    expect(ItemsService.add).toHaveBeenCalled();
    expect(ItemsService.get).toHaveBeenCalledWith('itemsList');
    expect(itemsList[5].category).toEqual(newName);
  });




});
