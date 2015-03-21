Meteor.publish('quests', function() {
  return QuestRepo.findAll();
});
