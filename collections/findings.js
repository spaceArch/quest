Findings = new Meteor.Collection('findings');

Findings.allow({
  update: function(userId, doc) {
    return !! userId;
  },
  remove: function(userId, doc) {
    return !! userId;
  }
});

Meteor.methods({
  addFinding: function(finding) {
    var user = Meteor.user();

    if (!user)
      throw new Meteor.Error(401, "You need to login");

    var finding = _.extend(
      _.pick(finding, 'geojson', 'quest_id', 'file_name'),
      {
        created_at: new Date().getTime(),
        autor_id: Meteor.userId()
      }
    );

    Findings.insert(finding);
  }
});
