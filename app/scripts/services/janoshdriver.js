'use strict';

angular.module('09ScreeninvaderApp')
  .factory('JanoshDriver', function ($http,$timeout,$rootScope,md5) {

var _ServerUrl        = 'http://10.20.30.40/cgi-bin/get?/.',
      _BaseUrl        = 'http://10.20.30.40/cgi-bin/',
      _getAll         = _BaseUrl + 'get?/.',
    _playItem         = _BaseUrl + 'playlist_jump?',
      _delItem        = _BaseUrl + 'playlist_remove?',
  _toggleQueue        = _BaseUrl + 'set?/playlist/queue=',
      _addItem        = _BaseUrl + 'show?',

_stepBackward         = _BaseUrl + 'trigger?playerPrevious',
_fastBackward         = _BaseUrl + 'trigger?playerRewindMore',
    _backward         = _BaseUrl + 'trigger?playerRewind',
        _stop         = _BaseUrl + 'trigger?playerClose',
      _pause          = _BaseUrl + 'trigger?playerPause',
      _forward        = _BaseUrl + 'trigger?playerForward',
  _fastForward        = _BaseUrl + 'trigger?playerForwardMore',
  _stepForward        = _BaseUrl + 'trigger?playerNext',

_browserClose         = _BaseUrl + 'trigger?browserClose',
    _pdfClose         = _BaseUrl + 'trigger?pdfClose',

        service       = {},
        _model        = {},
        _INTERVAL     = 700,
        _JsonLastHash = '',
        _init         = true;


    service.browserClose = function() {
      $http.get(_browserClose);
    }

    service.pdfClose = function() {
      $http.get(_pdfClose);
    }

    service.toggleQueue = function() {
      var queueState;
      if ($rootScope.model.playlist.queue === 'true') {
        queueState = false
      } else {
        queueState = true
      }
      $http.get(_toggleQueue+queueState)
    }

    service.pause = function() {
      $http.get(_pause);
    }

    service.stop = function() {
      $http.get(_stop);
    }

    service.playerClose = function() {
      $http.get(_stop);
    }

    service.stepForward = function() {
      $http.get(_stepForward);
    }

    service.stepBackward = function() {
      $http.get(_stepBackward);
    }

    service.fastForward = function() {
      $http.get(_fastForward);
    }

    service.forward = function() {
      $http.get(_forward);
    }

    service.fastBackward = function() {
      $http.get(_fastBackward);
    }
    service.backward = function() {
      $http.get(_backward);
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
      $http.get(_playItem+key);
    }

    service.deleatItem = function(key) {
      $http.get(_delItem+key);
    }

    service.addItem = function(source) {
      console.log(source);
      $http.get(_addItem+source);
    }

    return service
});
