'use strict';

angular.module('09ScreeninvaderApp')
  .controller('NotifyCtrl', function ($scope,$timeout,$state,$stateParams) {
  $scope.isHidden = true;

  $scope.showNotification = function() {
    $scope.isHidden = false;
    $timeout(function() {
      $scope.isHidden = true;
      $state.go('app');
    },1500);
  }

  switch($stateParams.type) {
    case 'del':
      $scope.contex = 'Item will be deleated';
      $scope.showNotification();
      break;
    case 'play':
      $scope.contex = 'Item will be played';
      $scope.showNotification();
      break;
    case 'step-backward':
      $scope.contex = 'step-backward';
      $scope.showNotification();
      break;
    case 'fast-backward':
      $scope.contex = 'fast-backward';
      $scope.showNotification();
      break;
    case 'backward':
      $scope.contex = 'backward';
      $scope.showNotification();
      break;
    case 'stop':
      $scope.contex = 'stop';
      $scope.showNotification();
      break;
    case 'pause':
      $scope.contex = 'pause';
      $scope.showNotification();
      break;
    case 'forward':
      $scope.contex = 'forward';
      $scope.showNotification();
      break;
    case 'fast-forward':
      $scope.contex = 'fast-forward';
      $scope.showNotification();
      break;
    case 'step-forward':
      $scope.contex = 'step-forward';
      $scope.showNotification();
      break;
  }

});
