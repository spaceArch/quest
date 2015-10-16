Meteor.methods({
  processImages: function(quest) {
    var space = Meteor.npmRequire('space_lib');

    Meteor.wrapAsync(quest.quest_images.forEach, quest.quest_images)(function(image) {
      var p = space.createThumb(quest.quest_id, image.name);
      Meteor.wrapAsync(p.then, p)(function(preview) {
        try {
          var q = QuestRepo.findOne({quest_id: quest.quest_id});
          var images = q.quest_images;

          images = images.map(function(img) {
            if(img.name != image.name) {
              return img;
            }

            img.previewPath = space.getThumbPath(quest.quest_id, image.name);
            return img;
          });

          Quests.update(q._id, {
            $set: {
              quest_images: images
            }
          });
        }
        catch(e) {
          console.log(e);
        }
      })

      Meteor.wrapAsync(space.tile(quest.quest_id, image.name).then)(function(info) {
        try {
          var q = QuestRepo.findOne({quest_id: quest.quest_id})
          var images = q.quest_images;

          images = images.map(function(img) {
            if(img.name != image.name) {
              return img;
            }

            img.height = info.height;
            img.width = info.width;
            img.maxZoom = info.maxZoom;
            img.tilesPath = space.getTilesPath(quest.quest_id, image.name);
            return img;
          });

          Quests.update(q._id, {
            $set: {
              quest_images: images
            }
          });
        }
        catch(e) {
          console.log(e);
        }
      });
    });
  }
})
