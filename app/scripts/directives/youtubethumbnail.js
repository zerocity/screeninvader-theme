'use strict';

angular.module('09ScreeninvaderApp')
  .directive('youtubeThumbnail', function($timeout) {
    return {
      template: '<img class=\'media-item\' ng-src={{youtubeUrl}} style={{cssStyle}}></img>',
      scope: {
        youtubeThumbnailSrc: '=url'
      },
      restrict: 'E',
      link: function(scope, element, attr) {
        var getYoutubesource = function() {
          var defaultStyle = 32,
              youtubeId
          ;
          if (attr.size) {
            defaultStyle = attr.size;
          }
          scope.cssStyle = 'width: ' + defaultStyle + 'px; height: ' + defaultStyle + 'px;';

          if (typeof scope.youtubeThumbnailSrc === 'string') {
            youtubeId = scope.youtubeThumbnailSrc.split('v=')[1].split('&')[0]; // remove &
          } else {
            //playlist fix different url
            youtubeId = scope.youtubeThumbnailSrc.source.split('v=')[1].split('&#')[0];
          }
          scope.youtubeUrl = 'http://img.youtube.com/vi/' + youtubeId + '/default.jpg';
        };
        $timeout(getYoutubesource, 0);
      }
    };
  });
