Template.home.rendered = function() {
  $('.toggle-navbar').addClass("hide");
  $('.map-filters').addClass("hide");
  $('.navbar').addClass("expanded");
  $('body').removeClass("map-view");

  $('body>div[style]').remove();
};

Template.home.helpers({
  questsList: function () {
    return QuestRepo.findAll();
  }
});
