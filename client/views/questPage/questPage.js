Template.questPage.created = function() {
  Comments.ui.config({
    limit: 25,
    loadMoreCount: 25,
    template: 'bootstrap'
  });
};

Template.questPage.rendered = function() {
  $('.toggle-navbar').removeClass("hide");
  $('.map-filters').removeClass("hide");
  $('.navbar').removeClass("expanded");
  $('body').addClass("map-view");
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
  }
});

initMap = function(){
  var quest_id = this.data.quest_id;
  image = {
    name:'test_quest',
    width: 19424,
    height: 5249,
    minZoom: 2,
    maxZoom: 9
  }
  map = MAP.initMap(image, this.data.quest_title);
  var c = Router.current()
  MAP.panTo(c.params.zoom || 8, c.params.x || image.width/2, c.params.y || image.height/2 );

  MAP.onMoved(function(zoom,x,y){
    history.pushState({}, "", '/quest/' + quest_id + '/' + zoom + '/' + image.name + '/' + x + '/' + y);
  });
  MAP.applyFilters()
}
