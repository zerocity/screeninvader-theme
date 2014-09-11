'use strict';

angular.module('09ScreeninvaderApp')
  .controller('HistoryCtrl', function ($scope,$firebase,$filter,$parse) {
    var ref = new Firebase("https://brilliant-fire-7900.firebaseio.com");
    var sync = $firebase(ref.limit(50));
    $scope.historyPro =  sync.$asArray();
    var orderBy = $filter('orderBy');

    $scope.historyPro = $scope.historyPro.$loaded().then(function(data) {
       $scope.history = orderBy(data, '-date');
       return data;
    });

    $scope.order = function(predicate, reverse) {
      $scope.history = orderBy($scope.history, predicate, reverse);
    };

});
