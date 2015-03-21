function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
var images = [];

Template.addQuest.created = function() {
  Uploader.uploadUrl = Meteor.absoluteUrl("upload");
  Session.set("questId", makeid());
};

Template.addQuest.helpers({
  uploadingImages: function() {
    return {
      finished: function(index, fileInfo, context) {
        images.push(fileInfo);
      }
    }
  }
});

Template.addQuest.events({
  'submit form': function (e) {
    e.preventDefault();

    console.log('submit form!');    
    console.log('uploadedImages', images);

    var questTitle = $(e.target).find('[name=titleQuest]').val(),
        questSummary = $(e.target).find('[name=summaryQuest]').val();

    var quest = {
      quest_id: Session.get('questId'),
      quest_title: questTitle,
      quest_summary: questSummary,
      quest_images: images,
      autor_id: Meteor.userId(),
      created_at: new Date().getTime()
    }
    
    console.log('quest ' , quest);

    Meteor.call('addQuest', quest, function (error, result) {
      if (error) {
        return alert(error.reason);
      }
      else {
        Router.go('questPage', {quest_id: Session.get('questId')});
      }
    });

  }
});