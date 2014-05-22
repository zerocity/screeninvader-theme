'use strict';

describe('Service: JanoshDriver', function () {

  // load the service's module
  beforeEach(module('09ScreeninvaderApp'));

  // instantiate service
  var JanoshDriver;
  beforeEach(inject(function (_JanoshDriver_) {
    JanoshDriver = _JanoshDriver_;
  }));

  it('should do something', function () {
    expect(!!JanoshDriver).toBe(true);
  });

});
