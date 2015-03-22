Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('landing', {path: '/'});
  this.route('addQuest', {path: '/add'});

  this.route('home', {
    path: '/quests',
    waitOn: function() {
      if (Meteor.userId()) {
        return Meteor.subscribe('questsByUser', Meteor.userId());
      }
    }
  });

  this.route('allQuests', {
    path: '/quests/all',
    template: 'home',
    waitOn: function () {
      if (Meteor.userId()) {
        return Meteor.subscribe('quests');
      }
    }
  });  

  this.route('questPage', {
    path: '/quest/:quest_id',
    waitOn: function () {
      if (Meteor.userId()) {
        Session.set('questId', this.params.quest_id);
        return Meteor.subscribe('questItem', Session.get('questId'));
      }
    },
    data: function () {
      return QuestRepo.findOne({quest_id: Session.get('questId')});
    }
  });

  this.route('questSeek', {
    path: '/quest/:quest_id/:zoom/:file_name/:x/:y',
    template: 'questSeek',
    waitOn: function () {
      if (Meteor.userId()) {
        Session.set('questId', this.params.quest_id);
        return Meteor.subscribe('questItem', Session.get('questId'));
      }
    },
    data: function () {      
      return QuestRepo.findOne({quest_id: Session.get('questId')});
    }
  });

});

Router.onBeforeAction(RouterService.requireLogin, {
  except: ['landing']
});
