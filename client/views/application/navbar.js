Template.navbar.helpers({
  isValidUser: function () {
    return Meteor.user();
  }
});

Template.navbar.events({
  'click .toggle-navbar': function (e) {
    if ($('.navbar').hasClass("expanded")) {
      $('.navbar').removeClass("expanded");
    }
    else {
      $('.navbar').addClass("expanded")
    }
  },
});