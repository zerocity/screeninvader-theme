/* global $ */
'use strict';

angular.module('09ScreeninvaderApp')
  .controller('MainCtrl', function ($scope,JanoshDriver,$rootScope) {

    $scope.getUrl = function(key) {
      $('#'+key).toggleClass('hide').focus();
    };
  })
  .directive('autoscrollDown', function () {
    return {
      link: function postLink(scope, element, attrs) {
        scope.$watch(
          function () {
            return element.children().length;
          },
          function () {
            element.animate({ scrollTop: element.prop('scrollHeight')}, 100);
          }
        );
      }
    };
  });
