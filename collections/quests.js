Quests = new Meteor.Collection('quests');

Quests.allow({
  update: function(userId, doc) {
    return !! userId;
  },
  remove: function(userId, doc) {
    return !! userId;
  }
});
