Template.home.rendered = function() {
  UIRepo.changeContentView(false);
  $('body>div[style]').remove();
};

Template.home.helpers({
  questsList: function () {
    return QuestRepo.findAll();
  }
});
