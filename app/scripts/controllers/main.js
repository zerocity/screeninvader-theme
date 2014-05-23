'use strict';

angular.module('09ScreeninvaderApp')
  .controller('MainCtrl', function ($scope,JanoshDriver) {
    $scope.screeninvader = JanoshDriver.getModel();

    $scope.getUrl = function(key) {
      $('#'+key).toggleClass('hide').focus();
    };

});
