OPTIONS = {
  getOption: function(name){
    try {
      return Meteor.user().profile.map_options[name]
    } catch(e){}
  },
  setOption: function(name, value){
    try {
      var path = 'profile.map_options.' + name;
      var set_obj = {};
      set_obj[path] = value;
      Meteor.users.update(Meteor.userId(), { $set: set_obj });
    } catch(e) {}
  }
};


