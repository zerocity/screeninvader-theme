'use strict';

describe('Controller: NotifyCtrl', function () {

  // load the controller's module
  beforeEach(module('09ScreeninvaderApp'));

  var NotifyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NotifyCtrl = $controller('NotifyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
