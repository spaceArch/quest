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
  }
});

initMap = function(){
  map = MAP.initMap({
    name:'test_quest',
    width: 19424,
    height: 5249,
    minZoom: 2,
    maxZoom: 9
  }, this.data.quest_title);

  MAP.applyFilters()
  MAP.onMoved(function(x,y){
    console.log(x+','+y);
  });
}
