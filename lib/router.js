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
  this.route('home', {path: '/'});

  this.route('addQuest', {path: '/add'});

});

Router.onBeforeAction(RouterService.requireLogin, {
  except: ['home']
});