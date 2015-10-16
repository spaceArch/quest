Template.filterSlider.helpers({
});

Template.filterSlider.events({
  'change .gridToggle': function(event){
    var state = event.target.checked;
    OPTIONS.setOption('is_grid', state);
    Session.set('is_grid', state);
  }
});
