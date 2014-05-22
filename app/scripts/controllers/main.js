'use strict';

angular.module('09ScreeninvaderApp')
  .controller('MainCtrl', function ($scope,JanoshDriver) {

    $scope.data = function() {
      JanoshDriver.getJanoshData()
        .then(function(data) {
          $scope.screeninvader = data
        },function(data) {
          console.error(data)
        });
    }

    $scope.data();

    $scope.getUrl = function(key) {
      console.log('test');
      $('#'+key).toggleClass('hide').focus();
    };


});
