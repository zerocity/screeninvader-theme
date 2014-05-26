'use strict';

angular
  .module('09ScreeninvaderApp', [
    'ngResource',
    'ngSanitize',
    'angular-md5',
    'ui.router'
  ])
  .config(function($stateProvider,$urlRouterProvider,$sceDelegateProvider) {
    /*$sceDelegateProvider.resourceUrlWhitelist(['^(?:http(?:s)?:\/\/)?(?:[^\.]+\.)?\(vimeo|youtube)\.com(/.*)?$', 'self']);*/

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
             }
          }
    };

    var itemActions = {
        url: "/action/:type/:id",
        onEnter: function($stateParams, $state,$rootScope,JanoshDriver) {

          var showNotification = function(context) {

            var oldURL = location.href.split('#/')[1];
            console.log(oldURL);
            console.log($stateParams);

            var oldState = function() {
              if (oldURL === '') {
                return 'app'
              } else {
                return 'app.' + oldURL
              }
            }

            return $state.go(oldState());

        /*    $timeout(function() {
              $scope.isHidden = true;
              if ($rootScope.previousState.name == '') {
                $state.go('app');
              } else {
                $state.go($rootScope.previousState.name);
              }
            },1500);*/
          }

          switch($stateParams.type) {
            case 'del':
              if ($stateParams.id) {JanoshDriver.deleatItem($stateParams.id) }
              showNotification('Item will be deleated');
              console.log($rootScope.previousState);
              break;
            case 'play':
              if ($stateParams.id) {JanoshDriver.playItem($stateParams.id) }
              showNotification('Item will be played');
              console.log($rootScope.previousState);
              break;
            case 'stop':
              JanoshDriver.stop()
              showNotification('stop');
              console.log($rootScope.previousState);
              break;
            case 'pause':
              JanoshDriver.pause();
              showNotification('pause');
              console.log($rootScope.previousState);
              break;
           }
        }
    };

    var playerControll = {
        url:'controll/:type',
        onEnter: function($stateParams, $state,$rootScope,JanoshDriver) {

          var showNotification = function(context) {

            var oldURL = location.href.split('#/')[1];
            console.log(oldURL);
            console.log($stateParams);

            var oldState = function() {
              if (oldURL === '') {
                return 'app'
              } else {
                return 'app.' + oldURL
              }
            }

            return $state.go(oldState());

        /*    $timeout(function() {
              $scope.isHidden = true;
              if ($rootScope.previousState.name == '') {
                $state.go('app');
              } else {
                $state.go($rootScope.previousState.name);
              }
            },1500);*/
          }

          switch($stateParams.type) {
            case 'del':
              if ($stateParams.id) {JanoshDriver.deleatItem($stateParams.id) }
              showNotification('Item will be deleated');
              console.log($rootScope.previousState);
              break;
            case 'play':
              if ($stateParams.id) {JanoshDriver.playItem($stateParams.id) }
              showNotification('Item will be played');
              console.log($rootScope.previousState);
              break;
            case 'step-backward':
              JanoshDriver.stepBackward()
              showNotification('step-backward');
              console.log($rootScope.previousState);
              break;
            case 'fast-backward':
              JanoshDriver.fastBackward()
              showNotification('fast-backward');
              console.log($rootScope.previousState);
              break;
            case 'backward':
              JanoshDriver.backward()
              showNotification('backward');
              console.log($rootScope.previousState);
              break;
            case 'stop':
              JanoshDriver.stop()
              showNotification('stop');
              console.log($rootScope.previousState);
              break;
            case 'pause':
              JanoshDriver.pause();
              showNotification('pause');
              console.log($rootScope.previousState);
              break;
            case 'forward':
              JanoshDriver.forward()
              showNotification('forward');
              console.log($rootScope.previousState);
              break;
            case 'fast-forward':
              JanoshDriver.fastForward()
              showNotification('fast-forward');
              console.log($rootScope.previousState);
              break;
            case 'step-forward':
              JanoshDriver.stepForward()
              showNotification('step-forward');
              console.log($rootScope.previousState);
              break;
          }
        }
    };

    $stateProvider
       .state('app',basicLayout)
       .state('app.search',youtubeSearchView)
       .state('app.action',itemActions)
       .state('app.playerControll',playerControll)
       .state('app.list',viewList)
       .state('app.small',viewSmall)
       .state('app.big',viewBig)
       .state('app.thump',viewThump)
  })
  .run(function(JanoshDriver,$timeout,$rootScope){

    $rootScope.previousState = {};
    $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
        // store previous state in $rootScope
        $rootScope.previousState.name = fromState.name;
        $rootScope.previousState.params = fromParams;
    });

    $timeout(function() {
      JanoshDriver.getJanoshData();
      console.log('run');
    },0);

  });
