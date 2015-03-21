Template.addQuest.created = function() {
  Uploader.uploadUrl = Meteor.absoluteUrl("upload");
};

Template.addQuest.helpers({
  arrivals: function () {
    return ArrivalRepo.findNearest();
  }
});