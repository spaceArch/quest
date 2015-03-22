MAP = {
  _map: null,
  _rc: null,
  _moveCallback: null,

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
  }
}
