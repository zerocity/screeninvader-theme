'use strict';

angular.module('09ScreeninvaderApp')
  .service('Youtubeapi', function Youtubeapi($q, $http) {
    var API_URL = 'http://gdata.youtube.com/feeds/api/videos';
    var max_videos = 8;

    this.searchYoutube = function(term) {
      var parameters = {
        params: {
          type: 'video',
          'max-results': max_videos,
          alt: 'json',
          q: term
        }
      };
      var deferred = $q.defer();

      $http.get(API_URL, parameters)
        .then(function (result) {
          var data = _.map(result.data.feed.entry, function (num, key) {
            var a = num.id.$t.split("/"),
                id = a[6],
                title = num.title.$t,
                thumbnail = num.media$group.media$thumbnail[1].url,
                description = num.media$group.media$description.$t,
                duration = num.media$group.yt$duration.seconds,
                author = num.author[0].name.$t;

            return {
                author: author,
                duration:duration,
                source: "http://www.youtube.com/watch?v=" + id,
                youtubeId: id,
                title: title,
                thumbnail: thumbnail,
                description: description
            };
          });

          deferred.resolve(data);
        },
        function() {
          deferred.reject(arguments);
        });
      return deferred.promise;
    }
});
