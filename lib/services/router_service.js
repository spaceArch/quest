RouterService = {
  requireLogin: function () {
    if (!Meteor.user()) {
      if (Meteor.loggingIn())
        this.render(this.loadingTemplate);
      else 
        this.render('accessDenied');
    }
    else
      this.next();
  }
}