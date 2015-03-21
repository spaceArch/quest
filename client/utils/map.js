MAP = {
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

    // pan to coords
    map.setView(rc.unproject([image.width/2, image.height/2]), 8);

    // the tile layer containing the image generated with gdal2tiles --leaflet ...
    url_tmp = 'http://188.226.222.86/store/'+image.name+'/tiles/large/{z}/{x}/{y}.png'
    var layer = L.tileLayer(url_tmp, {
      noWrap: true,
      attribution: attribution
    })
    layer.addTo(map);
    LAYER = layer.getContainer();
    MAP._map = map;
    movedHandler = function(){
      if(MAP._moveCallback) {
        var point = rc.project(map.getCenter());
        var x = Math.round(point.x);
        var y = Math.round(point.y);
        MAP._moveCallback(x, y);
      }
    };
    map.on('move', _.debounce(movedHandler, 100));
    return map;
  },

  applyFilters: function(){
    F.setAllFilters(LAYER, F.getFromProfile() || 'contrast(1) brightness(1)');
  },

  onMoved: function(callback){
    MAP._moveCallback = callback;
  }

}
