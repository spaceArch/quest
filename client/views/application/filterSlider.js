(function(){

  Template.filterSlider.helpers({
    cssClass: function () {
      return "map-filters__slider-" + this.name
    },

    initialValue: function(){
      var val = F.getIinitialFilter(this.name);
      if(val === undefined) {
        val = FILTER_CONFIG[this.name].initial;
      }

      return val;
    },

    min: function(){return FILTER_CONFIG[this.name].min},
    max: function(){return FILTER_CONFIG[this.name].max},
    step: function(){return FILTER_CONFIG[this.name].step}
  });

  Template.filterSlider.events({
    'change input': function () {
      updateFilters.apply(this,arguments);
    },
    'mousemove input': function () {
      updateFilters.apply(this,arguments);
    },
  });

  _updateFilters = function(e){
    var layerElem = LAYER;
    F.updateFilter(layerElem.getContainer(), this.name, e.target.value);
  };
  updateFilters = _.debounce(_updateFilters, 16);

  // //////////////////////////////////////////////////////////////
  FILTER_CONFIG = {
    contrast: {
      min: .1,
      max: 4,
      step: .01,
      initial: 1
    },
    brightness: {
      min: .1,
      max: 4,
      step: .01,
      initial: 1
    },
  }
})()
