'use strict';

angular.module('09ScreeninvaderApp')
  .controller('HistoryCtrl', function ($scope,$firebase,$filter) {
     $scope.loading = true;

    var ref = new Firebase("https://brilliant-fire-7900.firebaseio.com");

    var sync = $firebase(ref);
    var record = sync.$asObject();



    $scope.histroy = record.$loaded()

    $scope.histroy.then(function(data) {
       $scope.loading = false;
       $scope.history = data;
    });


     var orderBy = $filter('orderBy');

    $scope.order = function(predicate, reverse) {
      $scope.history = orderBy($scope.history, predicate, reverse);
    };

    $scope.order('-age',false);

});
