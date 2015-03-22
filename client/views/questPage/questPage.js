Template.questPage.created = function() {

};

Template.questPage.rendered = function() {
  UIRepo.changeContentView(false);
  initMap.call(this);
};
