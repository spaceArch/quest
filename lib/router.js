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
      var toLoad = [];
      // load quest
      Session.set('questId', this.params.quest_id);
      toLoad.push(Meteor.subscribe('questItem', Session.get('questId')));
      //  load findings for this image
      toLoad.push(Meteor.subscribe('findingsByQuest', this.params.quest_id) )
      return toLoad;
    },
    data: function () {
      return QuestRepo.findOne({quest_id: Session.get('questId')});
    }
  });

  this.route('questSeek', {
    path: '/quest/:quest_id/:zoom/:file_name/:x/:y',
    template: 'questSeek',
    waitOn: function () {
      var toLoad = [];
      // load quest
      Session.set('questId', this.params.quest_id);
      toLoad.push( Meteor.subscribe('questItem', Session.get('questId')) );
      //  load finding for this image
      toLoad.push(Meteor.subscribe('findingsByQuestAndImg', this.params.quest_id, this.params.file_name) )
      return toLoad;
    },
    data: function () {
      return QuestRepo.findOne({quest_id: Session.get('questId')});
    }
  });

});

Router.onBeforeAction(RouterService.requireLogin, {
  except: ['landing', 'questSeek']
});
