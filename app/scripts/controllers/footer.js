'use strict';

angular.module('09ScreeninvaderApp')
  .controller('FooterCtrl', function ($scope,$location,$anchorScroll) {

      $scope.gotoTop = function() {
        $location.hash('top');
        $anchorScroll();
        $location.hash('');
      }

});
