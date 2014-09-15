'use strict';

angular.module('09ScreeninvaderApp')
  .controller('MainCtrl', function ($scope,JanoshDriver,$rootScope) {

   /*  bugggg fix me*/
  $rootScope.$watch('notify',function(data) {
      if (typeof $scope.notify !== 'undefined') {
        if ($scope.notify.timestamp !== $rootScope.notify.timestamp) {
          console.log($scope.notify);
          //new notify message is send
          $scope.notify = $rootScope.notify;
          // after 3 sec the context message is reset
          console.log('test');
        }
      }
    });

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
