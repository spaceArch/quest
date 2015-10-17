Template.questPage.helpers({
  findings: function(){
    return Findings.find({quest_id: this.quest_id});
  },

    is_grid_show: function(){
    Session.get('is_grid') ? 'with_grid' : '';
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
}
