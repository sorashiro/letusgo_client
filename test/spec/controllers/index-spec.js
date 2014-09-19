'use strict';

describe('Controller: IndexCtrl', function () {
  var ItemsService, $scope, createController, $rootScope;

  beforeEach(function () {
    module('letusgoAngularJsApp');

    inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      ItemsService = $injector.get('ItemsService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('IndexCtrl', {
          $scope: $scope,
          itemService: ItemsService
        });
      };
    });
  });

  it('should load items', function () {
    spyOn(ItemsService, 'items');
    createController();
    ItemsService.items();
    expect(ItemsService.items).toHaveBeenCalled();
  });

  it('emit from parent controller', function() {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('parentHome');
    expect($scope.$emit).toHaveBeenCalledWith('parentCount');
  });

  it('should get correct number', function() {
    createController();
    $scope.$digest();
    spyOn(ItemsService, 'get');

    $rootScope.$broadcast('parentCount');
    $scope.$digest();

    var count = ItemsService.get() || 0;
    expect($scope.count).toBe(count);
  });

  it('home title should highlight', function() {
    createController();
    $scope.$digest();

    $rootScope.$broadcast('parentHome');
    $scope.$digest();

    expect($scope.homeStyle).toBe('active');
    expect($scope.cartStyle).toBe('0');
    expect($scope.itemsStyle).toBe('0');
    expect($scope.manageStyle).toBe('0');
  });

  it('items title should highlight', function() {
    createController();
    $scope.$digest();

    $rootScope.$broadcast('parentItems');
    $scope.$digest();

    expect($scope.homeStyle).toBe('0');
    expect($scope.cartStyle).toBe('0');
    expect($scope.itemsStyle).toBe('active');
    expect($scope.manageStyle).toBe('0');
  });

  it('cart title should highlight', function() {
    createController();
    $scope.$digest();

    $rootScope.$broadcast('parentCart');
    $scope.$digest();

    expect($scope.homeStyle).toBe('0');
    expect($scope.cartStyle).toBe('active');
    expect($scope.itemsStyle).toBe('0');
    expect($scope.manageStyle).toBe('0');
  });

  it('manage title should highlight', function() {
    createController();
    $scope.$digest();

    $rootScope.$broadcast('parentManage');
    $scope.$digest();

    expect($scope.homeStyle).toBe('0');
    expect($scope.cartStyle).toBe('0');
    expect($scope.itemsStyle).toBe('0');
    expect($scope.manageStyle).toBe('active');
  });
});
