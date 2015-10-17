Meteor.methods({
  handleMove: function(info) {
    try {

      var q = QuestRepo.findOne({quest_id: info.quest_id});
      var images = q.quest_images;

      images = Meteor.wrapAsync(images.map, images)(function(img) {
        if(img.name != info.image) {
          return img;
        }

        if(!img.heatmap_data) {
          img.heatmap_data = [];
        }
        else {
          var record;

          var match = Meteor.wrapAsync(img.heatmap_data.filter, img.heatmap_data)(function(r) {
            return (r.lat === info.lat && r.lng === info.lon)
          });

          if(match) {
            record = match[0];
          }

          if(!record) {
            img.heatmap_data.push({
              lat: info.lat,
              lng: info.lon,
              count: 1
            });
          }
          else {
            record.count = record.count + 1;
          }
        }

        return img;
      });

      Quests.update({quest_id: info.quest_id}, {
        $set: {
          quest_images: images
        }
      });

    }
    catch(e) {
      console.log(e);
    }
  }
})
