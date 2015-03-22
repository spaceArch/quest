Template.questSeek.created = function() {
  Comments.ui.config({
    limit: 25,
    loadMoreCount: 25,
    template: 'bootstrap'
  });
};

Template.questSeek.rendered = function() {
  $('.toggle-navbar').removeClass("hide");
  $('.map-filters').removeClass("hide");
  $('.navbar').removeClass("expanded");
  $('body').addClass("map-view");
  initMap.call(this);
};

Template.questSeek.helpers({
  pageId: function () {
    return Session.get('questId');
  }
});

Template.questSeek.events({
  'click .toggle-sidebar': function (e) {
    if ($('.sidebar').hasClass("expanded")) {
      $('.toggle-sidebar').removeClass("expanded");
      $('.sidebar').removeClass("expanded");
    }
    else {
      $('.toggle-sidebar').addClass("expanded");
      $('.sidebar').addClass("expanded")
    }
  }
});

initMap = function(){
  var quest_id = this.data.quest_id;
  var c = Router.current()
  var all_images = this.data.quest_images;
  var img = _.findWhere(all_images, {name: c.params.file_name});
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

  MAP.onMoved(function(zoom,x,y){
    history.pushState({}, "", '/quest/' + quest_id + '/' + zoom + '/' + image.name + '/' + x + '/' + y);
  });
  MAP.applyFilters()
}
