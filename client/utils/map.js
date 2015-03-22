MAP = {
  _map: null,
  _rc: null,
  _moveCallback: null,
  _circleStyle: {
    color: '#e74c3c',
    weight: 4,
    opacity: 0.9,
    fill: false
  },

  initMap: function(image, attribution){
    var map_el = document.querySelector('.map');
    // create the map
    var map = L.map(map_el ,{
      minZoom: image.minZoom,
      maxZoom: image.maxZoom,
      zoomControl: false
    });
    new L.Control.Zoom({ position: 'bottomright' }).addTo(map);

    var rc = new L.RasterCoords(map, [ image.width, image.height]);
    rc.setMaxBounds();
    MAP._rc = rc;

    // the tile layer containing the image generated with gdal2tiles --leaflet ...
    url_tmp = '/store/quest_'+image.quest_id+'/tiles/'+image.name+'/{z}/{x}/{y}.png'
    var layer = L.tileLayer(url_tmp, {
      noWrap: true,
      attribution: attribution
    })
    layer.addTo(map);
    MAP._img_layer = layer;
    LAYER = layer;
    MAP._map = map;
    movedHandler = function(){
      if(MAP._moveCallback) {
        var point = rc.project(map.getCenter());
        var x = Math.round(point.x);
        var y = Math.round(point.y);
        MAP._moveCallback(map.getZoom(), x, y);
      }
    };
    map.on('move', _.debounce(movedHandler, 100));

    MAP.initHeatmap(image.quest_id, image.name);

    return map;
  },

  applyFilters: function(){
    F.setAllFilters(LAYER.getContainer(), F.getFromProfile() || 'contrast(1) brightness(1)');
  },

  panTo: function(zoom, x, y){
    MAP._map.setView(MAP._rc.unproject([+x, +y]), +zoom);
  },

  onMoved: function(callback){
    MAP._moveCallback = callback;
  },

  initDrawControls: function(){
    // Initialise the FeatureGroup to store editable layers
    // var drawnItems = new L.FeatureGroup();
    // MAP._map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
      position: 'bottomright',
      edit: false,
      draw: {
        polygon: false,
        polyline: false,
        rectangle: false,
        marker: false,
        circle: {
          shapeOptions: MAP._circleStyle,
          showRadius: false
        }
      }
    });
    MAP._map.addControl(drawControl);

    MAP._map.on('draw:created', function (e) {
      var type = e.layerType,
          layer = e.layer,
          point = MAP._rc.project(e.layer.getLatLng()),
          x = Math.round(point.x),
          y = Math.round(point.y),
          zoom = MAP._map.getZoom(),
          preview_point = e.target.getPixelOrigin();

      preview_point = preview_point.divideBy(Math.pow(2,zoom+4)).round();
      preview_point.z = zoom-1;
      var tileUrl = MAP._img_layer.getTileUrl(preview_point);

      layer.bindPopup('A popup!');

      // Do whatever else you need to. (save to db, add to map etc)
      map.addLayer(layer);
      GEOJSON = layer.toGeoJSON();
      GEOJSON.properties.radius = layer.getRadius();
      // debugger
      MAP._drawCallback({
        geojson: GEOJSON,
        preview: tileUrl,
        x: x,
        y: y,
        zoom: zoom
      });
  });
  },

  onDrawed: function(callback){
    MAP._drawCallback = callback;
  },

  putFinding: function(geojson){
    L.geoJson(JSON.parse(geojson),{
      pointToLayer: function (feature, latlng) {
          circle =  L.circle(latlng, feature.properties.radius, MAP._circleStyle);
          return circle;
      }
    }).addTo(MAP._map);
  },

  initHeatmap: function(quest_id, image_name) {
    var images = Quests.findOne({quest_id: quest_id}).quest_images;

    var image = images.filter(function(img) {
      return img.name === image_name;
    })[0];

    var heatmap_data = image.heatmap_data;

    if(!heatmap_data) {
      return;
    }

    var cfg = {
      "radius": 10,
      "maxOpacity": .8,
      "scaleRadius": true,
      "useLocalExtrema": true,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };

    var heatmapLayer = new HeatmapOverlay(cfg);
    window.heatmapLayer = heatmapLayer;

    MAP._map.addLayer(heatmapLayer);

    setTimeout(function() {
      heatmapLayer.setData({
        max: 8,
        data: heatmap_data
      });
    }, 2000);
  }
}
