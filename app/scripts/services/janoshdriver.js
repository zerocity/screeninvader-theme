'use strict';

angular.module('09ScreeninvaderApp')
  .factory('JanoshDriver', function ($http,$timeout,$rootScope,$firebase,md5,Youtubeapi,notify) {


  var ref = new Firebase("https://brilliant-fire-7900.firebaseio.com");
  var sync = $firebase(ref);

//_BaseUrl        = 'http://localhost:5555/cgi-bin/',
// _BaseUrl        = 'http://10.20.30.40/cgi-bin/',
  var   _BaseUrl        = 'http://10.20.30.40/cgi-bin/',
        _getAll         = _BaseUrl + 'get?/.',
        _getHash  = _BaseUrl +'hash',
      _playItem         = _BaseUrl + 'playlist_jump?',
        _delItem        = _BaseUrl + 'playlist_remove?',
    _toggleQueue        = _BaseUrl + 'set?/playlist/queue=',
      _setSound         = _BaseUrl + 'set?/sound/volume=',
    _soundMute          = _BaseUrl + 'set?/sound/mute=',
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
       _pdfClose        = _BaseUrl + 'trigger?pdfClose',
       _getIp        = _BaseUrl + 'getip',
  _playlistClear        = _BaseUrl + 'playlist_clear',


          service       = {},
          _model        = {},
          _INTERVAL     = 1000,
          _JsonLastHash = '',
          _lastHash = '123123',
          _init         = true;


  function extractTitle(text) {
    var m = /<title>(.*)<\/title>/.exec(text);
    if (m && m[1]) {
      return m[1].replace(/<\/?title>/g," ").replace(/\s+/," ");
    }
    return; // returns undefined
  }

    service.setSoundPlus = function() {
      if ($rootScope.model.sound.volume != 100) {
        var v = parseInt($rootScope.model.sound.volume) + 15 ;
        $http.get(_setSound+v)
      }
    }

    service.setSound = function(vol) {
      var v = parseInt(vol);
      $http.get(_setSound+v)
    }

    service.playlistClear = function() {
      $http.get(_playlistClear);
      notify('Playlist Cleared');
    }

    service.setSoundMinus = function() {
      var v = parseInt($rootScope.model.sound.volume) - 15 ;
      $http.get(_setSound+v)
    }

    service.soundMute = function() {
      var convert = ($rootScope.model.sound.mute === 'true') ? true : false; // janosh return a 'true' / 'false' string
      console.log(_soundMute + !convert);
      $http.get(_soundMute + !convert);
      notify('Mute');
    }

    service.browserClose = function() {
      $http.get(_browserClose);
      notify('Browser will be closed soon');
    }

    service.pdfClose = function() {
      $http.get(_pdfClose);
      notify('PDF will be closed soon');
    }

    service.toggleQueue = function() {
      var queueState;
      if ($rootScope.model.playlist.queue === 'true') {
        queueState = false
        notify('Queue OFF');
      } else {
        queueState = true
        notify('Queue ON');
      }
      $http.get(_toggleQueue+queueState)
    }

    service.pause = function() {
      $http.get(_pause);
      notify('Player Pause');
    }

    service.stop = function() {
      $http.get(_stop);
      notify('Player Stoped');
    }

    service.playerClose = function() {
      $http.get(_stop);
      notify('Player Stoped');
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

    service.getip = function() {
      $http.get(_getIp).success(function(data,status){
        if (status == 200) {
          $rootScope.serverIp = data;
        };
      });
    };

    service.checkForUpdate = function(){
      $http.get(_getHash).
        success(function (data,status){
          if (data != $rootScope.lastHash) {
            console.log('UPDATE',' OLD HASH',$rootScope.lastHash,'NEW HASH',data)
            $rootScope.lastHash = data
            service.getJanoshData();
          };
        }).error(function(data,status){
          notify("Can't connect to Screeninvader ");
        });
        $timeout(service.checkForUpdate , _INTERVAL);
    }

    service.getJanoshData = function() {
      $http.get(_getAll).
        success(function (data, status) {
          // json caching
          var _hash = service.createJsonMd5(data);
          if (_hash != _JsonLastHash ) {

            // append a 'uniq' ID
            var i = 0;
            var modifiedData = _.each(data.playlist.items,function(res){
              _.extend(res, {id: i});
                i  += 1;
            });
            data.playlist.items = modifiedData;

            $rootScope.model = data;
            _JsonLastHash = _hash;
          }
          //$timeout(service.getJanoshData , _INTERVAL);
        }).
        error(function (data, status){
          console.log('error',data,status);
          //service.getJanoshData();
        });
    };

    if (_init){
      _init = false;
      $rootScope.lastHash ='123';
      service.getip();
      service.checkForUpdate();
      //service.getJanoshData();
    }

    service.playItem = function(key) {
      notify('Play item ' + key )
      $http.get(_playItem+key);
    }

    service.deleatItem = function(key) {
      notify('Item ' + key + ' will be deleated')
      $http.get(_delItem+key);
    }

    service.addItem = function(source) {
      Youtubeapi.searchYoutube(source).then(function (result){
            var setTime = Math.round(new Date().getTime() / 1000).toString();
            sync.$push({date:setTime, title:result[0].title, urls:source});
      });
      notify('New Item added');
      $http.get(_addItem+source);
    }

    return service
});
