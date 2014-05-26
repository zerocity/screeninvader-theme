'use strict';

angular.module('09ScreeninvaderApp')
  .factory('JanoshDriver', function ($http,$timeout,$rootScope,md5) {

var _ServerUrl        = 'http://localhost:5555/cgi-bin/get?/.',
      _BaseUrl        = 'http://localhost:5555/cgi-bin/',
      _getAll         = _BaseUrl + 'get?/.',
    _playItem         = _BaseUrl + 'playlist_jump?',
      _delItem        = _BaseUrl + 'playlist_remove?',
      _addItem        = _BaseUrl + 'show?',

_stepBackward         = _BaseUrl + 'trigger?playerPrevious',
_fastBackward         = _BaseUrl + 'trigger?playerRewindMore',
    _backward         = _BaseUrl + 'trigger?playerRewind',
        _stop         = _BaseUrl + 'trigger?playerClose',
      _pause          = _BaseUrl + 'trigger?playerPause',
      _forward        = _BaseUrl + 'trigger?playerForward',
  _fastForward        = _BaseUrl + 'trigger?playerForwardMore',
  _stepForward        = _BaseUrl + 'trigger?playerNext',

        service       = {},
        _model        = {},
        _INTERVAL     = 700,
        _JsonLastHash = '',
        _init         = true;

    service.pause = function() {
      $http.get(_pause).then(function(res) {
        console.log(res);
      });
    }

    service.stop = function() {
      $http.get(_stop).then(function(res) {
        console.log(res);
      });
    }

    service.stepForward = function() {
      $http.get(_stepForward).then(function(res) {
        console.log(res);
      });
    }

    service.stepBackward = function() {
      $http.get(_stepBackward).then(function(res) {
        console.log(res);
      });
    }

    service.fastForward = function() {
      $http.get(_fastForward).then(function(res) {
        console.log(res);
      });
    }

    service.forward = function() {
      $http.get(_forward).then(function(res) {
        console.log(res);
      });
    }

    service.fastBackward = function() {
      $http.get(_fastBackward).then(function(res) {
        console.log(res);
      });
    }
    service.backward = function() {
      $http.get(_backward).then(function(res) {
        console.log(res);
      });
    }

    service.createJsonMd5 = function(jsonObject) {
        var stringifiedCandidate = JSON.stringify(jsonObject);
        var hash = md5.createHash(stringifiedCandidate);
        return hash;
    }

    service.getJanoshData = function() {
      $http.get(_getAll).
        success(function (data, status) {

          var _hash = service.createJsonMd5(data);

          if (_hash != _JsonLastHash ) {
            $rootScope.model = data;
            _JsonLastHash = _hash;
          }

          $timeout(service.getJanoshData , _INTERVAL);

        }).
        error(function (data, status){
          console.log('error',data,status);
          //service.getJanoshData();
        });
    };

    if (_init){
      _init = false;
      service.getJanoshData();
    }

    service.playItem = function(key) {
      $http.get(_playItem+key).then(function(res) {
        console.log(res);
      });
    }

    service.deleatItem = function(key) {
      $http.get(_delItem+key).then(function(res) {
        console.log(res);
      });
    }

    service.addItem = function(source) {
      $http.get(_addItem+source).then(function(res) {
        console.log(res);
      });
    }

    return service
});
