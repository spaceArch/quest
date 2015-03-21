Template.questPage.created = function() {
  Comments.ui.config({
    limit: 25,
    loadMoreCount: 25,
    template: 'bootstrap'
  });
};

Template.questPage.helpers({
  pageId: function () {
    return Session.get('questId');
  }
});

Template.questPage.events({
  'click .toggle-sidebar': function (e) {
    if ($('.sidebar').hasClass("expanded"))
      $('.sidebar').removeClass("expanded");
    else 
      $('.sidebar').addClass("expanded")
  },
});