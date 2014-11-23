/* global Firebase: true */
'use strict';

angular.module('09ScreeninvaderApp')
  .controller('HistoryCtrl',
    function ($scope,$firebase,$filter,$parse,JanoshDriver) {
      var ref = new Firebase('https://brilliant-fire-7900.firebaseio.com');
      var sync = $firebase(ref);
      $scope.historyPro =  sync.$asArray();
      var orderBy = $filter('orderBy');

      $scope.historyPro = $scope.historyPro.$loaded().then(function(data) {
        $scope.history = orderBy(data, '-date');
        return data;
      });

      $scope.order = function(predicate, reverse) {
        $scope.history = orderBy($scope.history, predicate, reverse);
      };

      $scope.postUrl = function(postUrlQuery) {
        JanoshDriver.addItem(postUrlQuery);
      };
    }
  );
