Template.questPage.created = function() {
  Comments.ui.config({
    limit: 25,
    loadMoreCount: 25,
    template: 'bootstrap'
  });
};

Template.questPage.rendered = function() {
  $('.toggle-navbar').removeClass("hide");
  $('.navbar').removeClass("expanded");
};

Template.questPage.helpers({
  pageId: function () {
    return Session.get('questId');
  }
});

Template.questPage.events({
  'click .toggle-sidebar': function (e) {
    if ($('.sidebar').hasClass("expanded")) {
      $('.toggle-sidebar').removeClass("expanded");
      $('.sidebar').removeClass("expanded");
    }
    else {
      $('.toggle-sidebar').addClass("expanded");
      $('.sidebar').addClass("expanded")
    }
  },
});
