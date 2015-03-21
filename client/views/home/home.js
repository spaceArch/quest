Template.home.rendered = function() {
  $('.toggle-navbar').addClass("hide");
  $('.navbar').addClass("expanded");
};

Template.home.helpers({
  questsList: function () {
    return QuestRepo.findAll();
  }
});
