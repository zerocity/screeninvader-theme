'use strict';

angular
  .module('09ScreeninvaderApp', [
    'ngResource',
    'ngSanitize',
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

    var itemActions = {
         url:'action/:type/:id',
         views:{
               'notify@':{
                  controller:'NotifyCtrl',
                  templateUrl:'views/notify.html',
               }
         }
    };

    var playerControll = {
         url:'controll/:type',
         views:{
               'notify@':{
                  controller:'NotifyCtrl',
                  templateUrl:'views/notify.html',
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
         url:'thump',
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
  .run(function(JanoshDriver){});
