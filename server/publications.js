Meteor.publish('quests', function() {
  return QuestRepo.findAll();
});

Meteor.publish('questsByUser', function(userId) {
  return Quests.find({autor_id: userId});
});

Meteor.publish('questItem', function(questId) {
  return Quests.find({quest_id: questId});
});

Meteor.publish('findingsByQuestAndImg', function(quest_id, file_name) {
  return Findings.find({quest_id: quest_id, file_name: file_name});
});

Meteor.publish('findingsByQuest', function(quest_id) {
  return Findings.find({quest_id: quest_id});
});
