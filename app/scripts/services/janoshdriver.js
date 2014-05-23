'use strict';

angular.module('09ScreeninvaderApp')
  .factory('JanoshDriver', function ($http,$timeout) {

    var _ServerUrl = 'http://192.168.0.11:5555/cgi-bin/get?/.',
        service = {},
        _model = {};

    service.getJanoshData = function() {
      $http.get(_ServerUrl).then(function(r) {
        _model = r.data;
        $timeout(service.getJanoshData,700);
      });
    };

    service.getJanoshData();

    service.setModel = function(model) {
      _model = model;
    }

    service.getModel = function() {
      return _model
    }

    return service
});
