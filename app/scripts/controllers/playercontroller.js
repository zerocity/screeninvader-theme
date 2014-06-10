'use strict';

angular.module('09ScreeninvaderApp')
  .controller('PlayercontrollerCtrl', function ($scope,$rootScope,JanoshDriver) {

    //############## Default settings ##############
    $scope.playerSetting = true;

    $scope.toggleSetting = function() {
      $scope.playerSetting = !$scope.playerSetting
    };

    $rootScope.$watch('model',function() {
      $scope.model = $rootScope.model;
    });

    $scope.updateSound = function(vol) {
      JanoshDriver.setSound(vol)
    }

});
