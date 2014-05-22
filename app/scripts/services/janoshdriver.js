'use strict';

angular.module('09ScreeninvaderApp')
  .factory('JanoshDriver', function ($http,$q) {

    var _ServerUrl = 'http://192.168.0.11:5555/cgi-bin/get?/.',
        service = {};

    service.getJanoshData = function() {
      var deferred = $q.defer();

      $http({
        method:'GET',
        url: _ServerUrl
      }).success(function(data){
        deferred.resolve(data);
      }).error(function(){
        deferred.reject('There was an error');
      });

      return deferred.promise;
    };
    return service
});
