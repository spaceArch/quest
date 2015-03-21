Template.questContent.created = function() {
  Comments.ui.config({
    limit: 25,
    loadMoreCount: 25,
    template: 'bootstrap'
  });
};

Template.questContent.helpers({
  pageId: function () {
    return Session.get('questId');
  }
});
