QuestRepo = {
  findAll: function () {
    return Quests.find({}, { sort: {created_at: 1} });
  },
  findOne: function (selector) {
    return Quests.findOne(selector);
  },
  insert: function (quest) {
    Quests.insert(quest);
  },
  update: function(id, updateFields) {
    
  },
  remove: function (id) {
    
  }
}
