Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() {
    if (Meteor.userId()) {
      return Meteor.subscribe('quests');
    }
  }
});

Router.map(function() {
  this.route('landing', {path: '/'});
  this.route('home', {path: '/quests'});

  this.route('addQuest', {path: '/add'});

  this.route('questPage', {
    path: '/quest/:quest_id',
    data: function () {
      if (Meteor.userId()) {
        Session.set('questId', this.params.quest_id);
        return QuestRepo.findOne({quest_id: this.params.quest_id});
      }
    }
  });
  this.route('questSeek', {
    path: '/quest/:quest_id/:zoom/:file_name/:x/:y',
    template: 'questSeek',
    data: function () {
      if (Meteor.userId()) {
        Session.set('questId', this.params.quest_id);

        return QuestRepo.findOne({quest_id: this.params.quest_id});
      }
    }
  });

});

Router.onBeforeAction(RouterService.requireLogin, {
  except: ['home']
});
