Template.home.helpers({
  questsList: function () {
    return QuestRepo.findAll();
  }
});
