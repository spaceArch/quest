Quests = new Meteor.Collection('quests');

// {
//   quest_id: '12345',
//   quest_title: 'Test title',
//   quest_summary: 'Test summary',
//   quest_images: ['test1.png', 'test2.pgng'],
//   autor_id: '12345',
//   created_at: 'datetime'
// }

Quests.allow({
  update: function(userId, doc) {
    return !! userId;
  },
  remove: function(userId, doc) {
    return !! userId;
  }
});


Meteor.methods({
  addQuest: function(quest) {
    var user = Meteor.user(),
        questWithSameId = QuestRepo.findOne({quest_id: quest.quest_id});

    if (!user)
      throw new Meteor.Error(401, "You need to login");
    if (questWithSameId)
      throw new Meteor.Error(409, 'Duplicate quests');

    var quest = _.extend(
      _.pick(quest, 'quest_id', 'quest_title', 'quest_summary', 'quest_images','autor_id'), {
        created_at: new Date().getTime()
    });

    QuestRepo.insert(quest);
  }
});