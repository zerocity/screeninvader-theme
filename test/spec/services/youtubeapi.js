'use strict';

describe('Service: youtubeApi', function () {

  // load the service's module
  beforeEach(module('09ScreeninvaderApp'));

  // instantiate service
  var youtubeApi;
  beforeEach(inject(function (_youtubeApi_) {
    youtubeApi = _youtubeApi_;
  }));

  it('should do something', function () {
    expect(!!youtubeApi).toBe(true);
  });

});
