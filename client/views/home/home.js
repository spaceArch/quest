Template.home.rendered = function() {
  UIRepo.changeContentView(false);
  $('body>div[style]').remove();

  $('#container').masonry({
      itemSelector: '.quest-item',
      singleMode: true,
      isResizable: true,
      isAnimated: true,
      animationOptions: { 
        queue: false, 
        duration: 500 
      }
    }); 
};

Template.home.helpers({
  questsList: function () {
    return QuestRepo.findAll();
  }
});
