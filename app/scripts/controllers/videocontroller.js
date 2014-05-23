'use strict';

angular.module('09ScreeninvaderApp')
  .controller('VideocontrollerCtrl', function ($scope,JanoshDriver,$timeout) {

  $scope.model = JanoshDriver.getModel();

  });
