Template.questPage.helpers({
  questItem: function () {
    var questId = Session.get('questId');
    
    return QuestRepo.findOne({quest_id: questId});
  }
});
