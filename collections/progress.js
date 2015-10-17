Progress = new Meteor.Collection('progress');

Progress.allow({
  insert: function(userId, doc) {
    return doc.userId === userId;
  }
});

Meteor.methods({
  addProgress: function(imageId, blocks) {
    var user = Meteor.user();

    if (!user)
      throw new Meteor.Error(401, "You need to login");

    var userRow = Progress.find({
      userId: user._id,
      imageId: imageId
    }).fetch();

    if(userRow.length === 0) {
      Progress.insert({
        userId: user._id,
        imageId: imageId,
        blocks: []
      });
    }

    Progress.update(
      {
        userId: user._id,
        imageId: imageId
      },
      {
        $addToSet: {
          blocks: {
            $each: blocks
          }
        }
      }
    );
  }
});
