'use strict';

angular.module('09ScreeninvaderApp')
  .controller('YoutubesearchCtrl', function ($scope,$http) {


  var youtubeAPI = function(query) {
    var max_videos = 12;
    var parameters = {
      params: {
          type: 'video',
          maxResults: max_videos,
          alt:'json',
          q: query
        }
      };
    var youtubeApiV3Url = 'https://www.googleapis.com/youtube/v3/search'; // require key parameter
    var youtubeApiV1Url = "http://gdata.youtube.com/feeds/api/videos";

    $http.get(youtubeApiV1Url,parameters)
      .success( function (result) {
        var data = _.map(result.feed.entry, function (num,key){
            var a = num.id.$t.split("/"),
                id = a[6],
                title = num.title.$t,
                thumbnail = num.media$group.media$thumbnail[1].url,
                description = num.media$group.media$description.$t;
            return {
              source:"http://www.youtube.com/watch?v="+id,
              youtubeId:id,
              title:title,
              thumbnail:thumbnail,
              description:description
            };
        });
        $scope.YoutubeResults = data;
        //console.log($scope.YoutubeResults);
      })
      .error(function(result) {
        console.log(result);
      });
  };
  youtubeAPI('daft punk');
});
