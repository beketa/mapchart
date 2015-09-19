this.mapchart = this.mapchart || {};

(function (mapchart) {
  "use strict";

  var markers = [];

  function getChartIcon(chart, scale) {
    return {
      url: chart.url,
      scaledSize: new google.maps.Size(chart.width * scale, chart.height * scale),
      anchor: new google.maps.Point(
        chart.width * scale * 0.5,
        chart.height * scale * 0.75
      )
    };
  }

  mapchart.addCharts = function (map, charts) {
    var initialScale = 0.25, initialZoom = map.getZoom();

    charts.forEach(function (chart) {
      var image = new Image();
      image.onload = function () {
        chart.width = this.width;
        chart.height = this.height;
        markers.push(new google.maps.Marker({
          position: chart.pos,
          map: map,
          icon: getChartIcon(chart, initialScale)
        }));
      };
      image.src = chart.url;
    });

    map.addListener('zoom_changed', function () {
      var zoom = map.getZoom();
      var scale = Math.pow(2, zoom - initialZoom) * initialScale;
      for (var i = 0; i < charts.length; i++) {
        if (!markers[i]) {
          continue;
        }
        markers[i].setIcon(getChartIcon(charts[i], scale));
      }
    });
  }
  
  mapchart.removeBackground = function (url) {
    return 'http://beketa-1071.appspot.com/api?url=' + encodeURIComponent(url);
  }

})(this.mapchart);
