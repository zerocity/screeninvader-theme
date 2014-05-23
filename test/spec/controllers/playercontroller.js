'use strict';

describe('Controller: PlayercontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('09ScreeninvaderApp'));

  var PlayercontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlayercontrollerCtrl = $controller('PlayercontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
