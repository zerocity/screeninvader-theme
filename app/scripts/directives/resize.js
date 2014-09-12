'use strict';

angular.module('09ScreeninvaderApp').directive('resize', function ($window) {
    // this directive will override scrollleft position with $timeout it is posible to set the scrollpsoition
    return function (scope, element) {
      var w = angular.element($window);
      scope.$watch(function () {
        return { 'h': w.height(), 'w': w.width() };
      }, function (newValue, oldValue) {
        scope.windowHeight = newValue.h;
        scope.windowWidth = newValue.w;

        scope.style = function (val) {
          return {
            'height': (newValue.h - parseInt(val)) + 'px'
          };
        };
      }, true);
      w.bind('resize', function () {
        scope.$apply();
      });
    };
});
