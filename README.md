# mapchart: Google Spreadsheets charts on Google Maps

Googleスプレッドシートで作ったグラフをGoogleマップで表示するためのライブラリです。

## 使い方

### Googleマップを表示する

まず、Googleマップを表示するHTMLのページを作成します。以下のドキュメントなどを参考にしてください。

https://developers.google.com/maps/documentation/javascript/tutorial

```
<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
      html, body { height: 100%; margin: 0; padding: 0; }
      #map { height: 100%; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script type="text/javascript">

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 9
  });
}

    </script>
    <script async defer
                src="https://maps.googleapis.com/maps/api/js?callback=initMap">
    </script>
  </body>
</html>
```

### Googleスプレッドシートでグラフを作成し公開する

以下の手順でGoogleスプレッドシートのグラフの画像へのリンクを用意します。

1. グラフの右上の三角形をクリックし、「グラフを公開...」を選ぶ。
2. 「リンク」、「画像」を選び、下に出てきた https://docs.google.com/spreadsheets/d/... で始まる文字列がグラフへのリンクです。

### グラフの画像をマップ上に表示するコードを追加する

mapchart.jsを読み込むためのコードを追加します。

```
<script type="text/javascript" src="http://beketa-1071.appspot.com/js/mapchart.js"></script> 
```

マップを初期化する関数の中で、座標とグラフへのリンクの配列を引数にして、mapchart.addChartsという関数を呼び出します。配列は、

```
[ { pos: {lat: 緯度, lng: 経度}, url: リンク }, { pos: {lat: 緯度, lng: 経度}, url: リンク }, ... ]
```

というような形式になります。

```
var charts = [
  { pos: {lat: -34.397, lng: -150.644},
    url: 'https://docs.google.com/spreadsheets/d/14x3KI7VphUI6-xzkeYFE_f58ZNS4-luV0MhUpbz5hR0/pubchart?oid=1500802721&format=image' }
];
mapchart.addCharts(map, charts);    
```

これらのコードを追加した後の全体は以下のようになります。

```
<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
      html, body { height: 100%; margin: 0; padding: 0; }
      #map { height: 100%; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script type="text/javascript" src="http://beketa-1071.appspot.com/js/mapchart.js"></script>
    <script type="text/javascript">

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 9
  });
  var charts = [
    { pos: {lat: -34.397, lng: 150.644},
      url: 'https://docs.google.com/spreadsheets/d/14x3KI7VphUI6-xzkeYFE_f58ZNS4-luV0MhUpbz5hR0/pubchart?oid=1500802721&format=image' }
  ];
  mapchart.addCharts(map, charts);
}

    </script>
    <script async defer
                src="https://maps.googleapis.com/maps/api/js?callback=initMap">
    </script>
  </body>
</html>
```

このままだとグラフの余白が残ってしまいますが、余白が白の場合、グラフへのリンクを以下のようにすると余白をなくすことができます。単純に白を透明に変換するだけなので、グラフに白を使用している場合はその部分も消えてしまいます。

```
var charts = [
  { pos: {lat: -34.397, lng: -150.644},
    url: mapchart.removeBackground('https://docs.google.com/spreadsheets/d/14x3KI7VphUI6-xzkeYFE_f58ZNS4-luV0MhUpbz5hR0/pubchart?oid=1500802721&format=image') }
];
```

### 使用例

http://beketa-1071.appspot.com/sample/tutorial.html
