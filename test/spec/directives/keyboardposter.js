'use strict';

describe('Directive: keyboardPoster', function () {

  // load the directive's module
  beforeEach(module('09ScreeninvaderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<keyboard-poster></keyboard-poster>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the keyboardPoster directive');
  }));
});
