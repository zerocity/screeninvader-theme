'use strict';

angular
  .module('09ScreeninvaderApp', [
    'ngResource',
    'ngSanitize',
    'ui.router'
  ])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
  .config(function($stateProvider,$urlRouterProvider) {
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

    var basicLayout = {
          url: '/',
          views:{
             'topBar':{
                controller: 'MainCtrl',
                templateUrl:'views/topbar.html'
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

});
