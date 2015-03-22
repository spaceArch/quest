Template.questSeek.created = function() {
  Comments.ui.config({
    limit: 25,
    loadMoreCount: 25,
    template: 'bootstrap'
  });
};

Template.questSeek.rendered = function() {
  UIRepo.changeContentView(true);
  initMap.call(this);
};

Template.questSeek.helpers({
  pageId: function () {
    id = '' + Session.get('questId');
    id += Session.get('image_name');
    id += Session.get('currentFinding');
    return id;
  }
});

Template.questSeek.events({
  'click .toggle-sidebar': function (e) {
    UIRepo.toggleSidebar();
  }
});

initMap = function(){
  var quest_id = this.data.quest_id;
  var c = Router.current()
  var all_images = this.data.quest_images;
  var img = _.findWhere(all_images, {name: c.params.file_name});
  Session.set('image_name', img.name);
  image = {
    name: img.name,
    width: img.width,
    height: img.height,
    minZoom: 2,
    maxZoom: img.maxZoom,
    quest_id: quest_id
  }
  map = MAP.initMap(image, this.data.quest_title);

  MAP.panTo(c.params.zoom || img.maxZoom, c.params.x || image.width/2, c.params.y || image.height/2 );

  var rc = new L.RasterCoords(map, [ image.width, image.height]);

  MAP.onMoved(function(zoom,x,y){
    history.pushState({}, "", '/quest/' + quest_id + '/' + zoom + '/' + image.name + '/' + x + '/' + y);
    HeatmapMoveHandler.handle({
      zoom: zoom,
      x: x,
      y: y,
      image: image.name,
      quest_id: quest_id,
      rc: rc
    });
  });
  MAP.applyFilters()

  // drawing only for registered
  if(Meteor.user().profile) {
    MAP.initDrawControls()
    MAP.onDrawed(function(data){
      Meteor.call('addFinding', {
        geojson: JSON.stringify(data.geojson),
        quest_id: quest_id,
        file_name: img.name,
        preview: data.preview,
        x: data.x,
        y: data.y,
        zoom: data.zoom
      });
    });
  }

  putCircles();

}

putCircles = function(){
  var file_name = Session.get('image_name');
  var quest_id = Session.get('questId');

  if(!file_name && !quest_id) return

  Findings.find({quest_id: quest_id, file_name: file_name})
    .fetch()
    .forEach(function(finding){
      MAP.putFinding(finding.geojson);
    });
}
// load findings
Tracker.autorun(function () {
  putCircles()
});
