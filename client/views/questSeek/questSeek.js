Template.questSeek.rendered = function(){
  var map_el = document.querySelector('.map');
  var img = [
      19424,  // original width of image
      5249// original height of image
    ];

  // create the map
  var map = L.map(map_el ,{
    minZoom: 2,
    maxZoom: 9
  });
  window.map = map;
  // // assign map and image dimensions
  var rc = new L.RasterCoords(map, img);
    window.rc = rc;
  // // set the bounds on map
  rc.setMaxBounds();

  // // set the view on a marker ...
  map.setView(rc.unproject([0, 0]), 0);

  var quest_url = Router.path('questPage', {quest_id: this.data._id})
  // the tile layer containing the image generated with gdal2tiles --leaflet ...
  var layer = L.tileLayer('http://188.226.222.86/store/test_quest/tiles/large/{z}/{x}/{y}.png', {
    noWrap: true,
    attribution: "<a href=\""+quest_url+"\">"+this.data.quest_title+"</a>"
  })
  layer.addTo(map);
  filters = new L.FilterControls({ layer: layer });
  filters.addTo(map);
}
