'use strict';

describe('Controller: YoutubesearchCtrl', function () {

  // load the controller's module
  beforeEach(module('09ScreeninvaderApp'));

  var YoutubesearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    YoutubesearchCtrl = $controller('YoutubesearchCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
