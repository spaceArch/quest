Meteor.publish('quests', function() {
  return QuestRepo.findAll();
});

Meteor.publish('questsByUser', function(userId) {
  return Quests.find({autor_id: userId});
});

Meteor.publish('questItem', function(questId) {
  return Quests.find({quest_id: questId});
});