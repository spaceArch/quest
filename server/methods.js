Meteor.methods({
  processImages: function(quest) {
    var space = Meteor.npmRequire('space_lib');

    quest.quest_images.forEach(function(image) {
      space.createThumb(quest.quest_id, image.name).then(function(res) {
        console.log(quest);
        var images = QuestRepo.findOne({quest_id: quest.quest_id});
        console.log(images);

        // QuestRepo.update(quest.quest_id, {
        //   $set: {
        //     quest_images:
        //   }
        // })
      });
      // space.tile(quest.quest_id, image.name);
    })
  }
})
