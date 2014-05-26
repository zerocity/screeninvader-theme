'use strict';

describe('Directive: backButton', function () {

  // load the directive's module
  beforeEach(module('09ScreeninvaderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<back-button></back-button>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the backButton directive');
  }));
});
