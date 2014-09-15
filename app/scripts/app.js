'use strict';

angular
  .module('09ScreeninvaderApp', [
    'ngResource',
    'ngSanitize',
    'angular-md5',
    'ui.router',
    'lr.upload',
    'xeditable',
    'firebase',
    'cgNotify',
    'cgBusy',
    'angular.filter',
    'angularMoment'
  ]).constant('angularMomentConfig', {
    preprocess: 'unix' // optional
  })
  .config(function($httpProvider,$stateProvider,$urlRouterProvider,$sceDelegateProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.useXDomain = true;

    $urlRouterProvider.otherwise('/');

    var youtubeSearchView = {
         url:'search',
         views:{
               'content@':{
                  controller:'YoutubesearchCtrl',
                  templateUrl:'views/youtubesearch.html'
               }
         }
    };

    var historyView = {
         url:'history',
         views:{
               'content@':{
                  controller:'HistoryCtrl',
                  templateUrl:'views/history.html'
               }
         }
    };

    var postUrlView = {
         url:'posturl',
         views:{
               'content@':{
                  controller:'YoutubesearchCtrl',
                  templateUrl:'views/posturl.html'
               }
         }
    };

    var viewList = {
         url:'list',
         views:{
               'content@':{
                  controller: 'MainCtrl',
                  templateUrl:'views/main.html'
               }
         }
    };

    var viewSmall = {
         url:'small',
         views:{
               'content@':{
                  controller: 'MainCtrl',
                  templateUrl:'views/viewsmall.html'
               }
         }
    };

    var viewBig = {
         url:'big',
         views:{
               'content@':{
                  controller: 'MainCtrl',
                  templateUrl:'views/viewbig.html'
               }
         }
    };

    var viewThump = {
         url:'thumb',
         views:{
               'content@':{
                  controller: 'MainCtrl',
                  templateUrl:'views/viewthump.html'
               }
         }
    };

    var basicLayout = {
          url: '/',
          views:{
             'topBar':{
                controller: 'MainCtrl',
                templateUrl:'views/topbar.html'
             },
             'playerController':{ // todo wronge nameing
                controller: 'PlayercontrollerCtrl',
                templateUrl:'views/playercontroller.html'
             },
             'viewController':{ // todo wronge nameing
                controller: 'VideocontrollerCtrl',
                templateUrl:'views/videocontroller.html'
             },
             'content':{
                controller: 'MainCtrl',
                templateUrl:'views/main.html'
             },
             'footer':{
                controller : 'FooterCtrl',
                templateUrl:'views/footer.html'
             }
          }
    };

    var itemActions = {
        url: "action/:type/:id",
        onEnter: function($stateParams, $state,$rootScope,JanoshDriver) {

           var resetUrl = function() {
            // back to last
            var oldURL = location.href.split('#/')[1];
            var oldState = function() {
              if (oldURL === '') {
                return 'app'
              } else {
                return 'app.' + oldURL
              }
            }
            return $state.go(oldState());
          }

          switch($stateParams.type) {
            case 'del':
              if ($stateParams.id) {JanoshDriver.deleatItem($stateParams.id) }
              resetUrl();
              break;
            case 'add':
              //$stateParams.id is the youtube Source
              if ($stateParams.id) {JanoshDriver.addItem($stateParams.id) }
              resetUrl();
              break;
            case 'play':
              if ($stateParams.id) {JanoshDriver.playItem($stateParams.id) }
              resetUrl();
              break;
            case 'stop':
              JanoshDriver.stop()
              resetUrl();
              break;
            case 'pause':
              JanoshDriver.pause();
              resetUrl();
              break;
           }
        }
    };

    var playerControll = {
        url:'controll/:type',
        onEnter: function($stateParams, $state,$rootScope,JanoshDriver) {

           var resetUrl = function() {
            // back to last
            var oldURL = location.href.split('#/')[1];
            var oldState = function() {
              if (oldURL === '') {
                return 'app'
              } else {
                return 'app.' + oldURL
              }
            }
            return $state.go(oldState());
          }

          switch($stateParams.type) {
            case 'playlist-clear':
              JanoshDriver.playlistClear();
              resetUrl();
              break;
            case 'del':
              if ($stateParams.id) {JanoshDriver.deleatItem($stateParams.id) }
              resetUrl();
              break;
            case 'play':
              if ($stateParams.id) {JanoshDriver.playItem($stateParams.id) }
              resetUrl();
              break;
            case 'step-backward':
              JanoshDriver.stepBackward();
              resetUrl();
              break;
            case 'fast-backward':
              JanoshDriver.fastBackward();
              resetUrl();
              break;
            case 'backward':
              JanoshDriver.backward();
              resetUrl();
              break;
            case 'stop':
              JanoshDriver.stop();
              resetUrl();
              break;
            case 'pause':
              JanoshDriver.pause();
              resetUrl();
              break;
            case 'forward':
              JanoshDriver.forward();
              resetUrl();
              break;
            case 'fast-forward':
              JanoshDriver.fastForward();
              resetUrl();
              break;
            case 'step-forward':
              JanoshDriver.stepForward();
              resetUrl();
              break;
            case 'queue':
              JanoshDriver.toggleQueue();
              resetUrl();
              break;
            case 'browserClose':
              JanoshDriver.browserClose();
              resetUrl();
              break;
            case 'pdfClose':
              JanoshDriver.pdfClose();
              resetUrl();
              break;
            case 'playerClose':
              notify('playerClose');
              resetUrl();
              break;
            case 'volumeup':
              notify('setSoundPlus');
              resetUrl();
              break;
            case 'volumedown':
              notify('setSoundMinus');
              resetUrl();
              break;
            case 'mute':
              notify('soundMute');
              resetUrl();
              break;
          }
        }
    };

    $stateProvider
       .state('app',basicLayout)
       .state('app.search',youtubeSearchView)
       .state('app.posturl',postUrlView)
       .state('app.action',itemActions)
       .state('app.playerControll',playerControll)
       .state('app.list',viewList)
       .state('app.small',viewSmall)
       .state('app.big',viewBig)
       .state('app.thumb',viewThump)
       .state('app.history',historyView)
  })
  .run(function(JanoshDriver,$timeout,$rootScope,editableOptions,editableThemes){
    editableOptions.theme = 'bs3';
    editableThemes.bs3.inputClass = 'input-xs pushRightSide';
    editableThemes.bs3.buttonsClass = 'btn-xs pushRightSide';
    $rootScope.toggleMenuSize = 0;
/*    $rootScope.previousState = {};
    $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
        // store previous state in $rootScope
        $rootScope.previousState.name = fromState.name;
        $rootScope.previousState.params = fromParams;
    });*/

    $timeout(function() {
      console.log('run');
    },0);

  });
