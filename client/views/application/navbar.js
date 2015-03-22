Template.navbar.helpers({
  isValidUser: function () {
    return Meteor.user();
  }
});

Template.navbar.events({
  'click .toggle-navbar': function () {
    UIRepo.toggleNavbar();
  },
});