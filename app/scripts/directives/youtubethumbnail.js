'use strict';

angular.module('09ScreeninvaderApp')
  .directive('youtubeThumbnail', function () {
    return {
      template: '<img className="media-item" ng-src={{youtubeThumbnailSrc}} style={{cssStyle}}></img>',
      scope : {
        youtubeThumbnailSrc: '=url'
      },
      restrict: 'E',
      link: function(scope, element, attr) {

        // option for thumbnailsizing
        var defaultStyle = 32;
        if (attr.size) {
          defaultStyle = attr.size;
        }
        scope.cssStyle = 'width: '+ defaultStyle+'px; height: '+ defaultStyle +'px;';

        // get the thumbnail from youtube
        var youtubeId = scope.youtubeThumbnailSrc.split('v=')[1];
        scope.youtubeThumbnailSrc = "http://img.youtube.com/vi/"+ youtubeId +"/default.jpg";
      }
    };
  });
