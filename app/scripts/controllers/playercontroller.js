'use strict';

angular.module('09ScreeninvaderApp')
  .controller('PlayercontrollerCtrl', function ($scope) {

    //############## Default settings ##############
    $scope.playerSetting = true;


    $scope.toggleSetting = function() {
      $scope.playerSetting = !$scope.playerSetting
    };

});
