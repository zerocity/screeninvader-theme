'use strict';

describe('Directive: youtubeThumbnail', function () {

  // load the directive's module
  beforeEach(module('09ScreeninvaderApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<youtube-thumbnail></youtube-thumbnail>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the youtubeThumbnail directive');
  }));
});
