Template.questPage.helpers({
  findings: function(){
    return Findings.find({quest_id: this.quest_id});
  }
});

Template.questPage.rendered = function() {
  UIRepo.changeContentView(false);

  $('#tab-nav a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  initMap.call(this);
};


var initMap = function(){
  var quest_id = this.data.quest_id;
  var c = Router.current()
  var all_images = this.data.quest_images;
  var img = all_images[0];
  Session.set('image_name', img.name);
  image = {
    name: img.name,
    width: img.width,
    height: img.height,
    minZoom: 2,
    maxZoom: img.maxZoom,
    quest_id: quest_id
  }
  map = MAP.initMap(image, this.data.quest_title, true);

  MAP.panTo(2,  image.width/2, image.height/2 );

  heatmap();
}

heatmap = function() {
  console.log('AAAAAAAAA')
  var quest_id = Session.get('questId')
  var image_name = Session.get('image_name')
  if(!image_name && !quest_id) return
  var images = QuestRepo.findOne({quest_id: quest_id}).quest_images;

  var image = images.filter(function(img) {
    return img.name === image_name;
  })[0];

  var heatmap_data = image.heatmap_data;

  if(heatmap_data) {
    window.heatmapLayer.setData({
      max: 8,
      data: heatmap_data
    });
  }
}

// load findings
Meteor.setInterval(function () {
  heatmap();
}, 250);
