'use strict';

describe('Controller: VideocontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('09ScreeninvaderApp'));

  var VideocontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    VideocontrollerCtrl = $controller('VideocontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
