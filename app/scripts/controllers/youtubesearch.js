'use strict';

angular.module('09ScreeninvaderApp')
  .controller('YoutubesearchCtrl', function ($scope,$http,$timeout,JanoshDriver,Youtubeapi,$rootScope) {

  $scope.YoutubeResults = {};
  $scope.showMenu = false;

  $scope.toggleMenu = function(){
    var heigth = 88;

    //push box up in to the view
    if ($rootScope.toggleMenuSize !=heigth){
      $rootScope.toggleMenuSize = heigth;
      $scope.showMenu = true;
    }else{
      $rootScope.toggleMenuSize = 0;
      $scope.showMenu = false;
    }
  }

  $scope.clearSearch = function () {
    $scope.query ='';
    $scope.YoutubeResults = {};
  }

  $scope.getUrl = function(key) {
    $('#'+key).toggleClass('hide').focus();
  };

  $scope.searchYoutube = function(term) {
    return Youtubeapi.searchYoutube(term).then(function (result){
      $scope.YoutubeResults = result
      return result
    });
  };

  $scope.postUrl = function() {
    JanoshDriver.addItem($scope.postUrlQuery)
  }

  $scope.acceptTypes = 'video/*,audio/*,image/*';

  $scope.onUpload = function(file) {
    console.log('upload',file);
    $scope.message = file[0].name + ' will be uploaded';
  }

  $scope.onError = function(res) {
    console.log('error',res);
  }

  $scope.onSuccess = function(res) {
    console.log('success',res);
  }

  $scope.onComplete = function(res) {
    console.log('Complete',res);
    $scope.message = 'Upload success';
  }

});
