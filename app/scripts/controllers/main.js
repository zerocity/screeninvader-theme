'use strict';

angular.module('09ScreeninvaderApp')
  .controller('MainCtrl', function ($scope,JanoshDriver,$rootScope) {

    $rootScope.$watch('model',function(data) {
      $scope.model = $rootScope.model;
    });

    $scope.getUrl = function(key) {
      $('#'+key).toggleClass('hide').focus();
    };

});
