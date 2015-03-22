Template.questPage.helpers({
  findings: function(){
    return Findings.find({quest_id: this.quest_id});
  }
});

Template.questPage.rendered = function() {
  UIRepo.changeContentView(false);
};
