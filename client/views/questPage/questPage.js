Template.questPage.created = function() {
  Comments.ui.config({
    limit: 25,
    loadMoreCount: 25,
    template: 'bootstrap'
  });
};

Template.questPage.rendered = function() {
  $('.toggle-navbar').removeClass("hide");
  $('.navbar').removeClass("expanded");
  initMap.call(this);
};

Template.questPage.helpers({
  pageId: function () {
    return Session.get('questId');
  }
});

Template.questPage.events({
  'click .toggle-sidebar': function (e) {
    if ($('.sidebar').hasClass("expanded")) {
      $('.toggle-sidebar').removeClass("expanded");
      $('.sidebar').removeClass("expanded");
    }
    else {
      $('.toggle-sidebar').addClass("expanded");
      $('.sidebar').addClass("expanded")
    }
  },
});

initMap = function(){
  var map_el = document.querySelector('.map');
  var img = [
      19424,  // original width of image
      5249// original height of image
    ];

  // create the map
  var map = L.map(map_el ,{
    minZoom: 2,
    maxZoom: 9,
    zoomControl: false
  });
  new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
  window.map = map;
  // // assign map and image dimensions
  var rc = new L.RasterCoords(map, img);
    window.rc = rc;
  // // set the bounds on map
  rc.setMaxBounds();

  // // set the view on a marker ...
  map.setView(rc.unproject([img[0]/2, img[1]/2]), 8);

  // the tile layer containing the image generated with gdal2tiles --leaflet ...
  var layer = L.tileLayer('http://188.226.222.86/store/test_quest/tiles/large/{z}/{x}/{y}.png', {
    noWrap: true,
    attribution: this.data.quest_title
  })
  layer.addTo(map);
  LAYER = layer.getContainer();
  F.setAllFilters(LAYER, F.getFromProfile() || 'contrast(1) brightness(1)');
}
