Template.questPage.created = function() {

};

Template.questPage.rendered = function() {
  $('.toggle-navbar').addClass("hide");
  $('.map-filters').addClass("hide");
  $('.navbar').addClass("expanded");
  $('body').removeClass("map-view");
  initMap.call(this);
};
