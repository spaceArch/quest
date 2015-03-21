L.FilterControls = L.Control.extend({
  options: {
    position: 'bottomleft'
  },

  onAdd: function (map) {
    var controlDiv = L.DomUtil.create('div', 'map-filters', map.getContainer());
    var layerElem = this.options.layer.getContainer();
    this._createSlider('contrast', controlDiv, layerElem, .1, 4);
    this._createSlider('brightness', controlDiv, layerElem, .1, 4);
    // this._createSlider('saturate', controlDiv, layerElem, .1, 4);
    // this._createSlider('invert', controlDiv, layerElem, 0, 1, 0);
    // this._createSlider('grayscale', controlDiv, layerElem, 0, 1, 0);

    L.DomEvent
      .addListener(controlDiv, 'mouseover', function () {
                map.dragging.disable();
              })
      .addListener(controlDiv, 'mouseout', function () {
                map.dragging.enable();
              })
    return controlDiv;
  },

  _createSlider: function(filterName, root, layerElem, min, max, initial){
    var slider = L.DomUtil.create('input', 'map-filters__slider map-filters__slider-'+filterName, root);
    initial = getIinitialFromProfile(filterName);
    initial = (initial === undefined)?1:initial;

    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.value = initial
    slider.step = .03;
    slider.title = filterName;
    var lastFilter = filterName + "(" + initial + ")";
    var newFilter = '';
    layerElem.style.webkitFilter += lastFilter;


    updateFilter = function(){
      setIinitialFromProfile(filterName, slider.value);
      newFilter = filterName + "(" + slider.value + ")";
      layerElem.style.webkitFilter = layerElem.style.webkitFilter.replace(lastFilter, newFilter);
      lastFilter = newFilter;
    }

    reset = function(){
      slider.value = initial;
      slider.dispatchEvent(new Event('change'));
    }

    L.DomEvent.addListener(slider, 'mousemove', updateFilter);
    L.DomEvent.addListener(slider, 'change', updateFilter);

    return {
      elem: slider,
      reset: reset
    };
  }
});

getIinitialFromProfile = function (filterName){
  try {
    return Meteor.user().profile.filter[filterName];
  } catch(e){
    return undefined
  }
}

setIinitialFromProfile = function (filterName, val){
  var filterProfPath = 'profile.filter.'+filterName;
  fields = {};
  fields[filterProfPath] = val;
  Meteor.users.update(Meteor.userId(), { $set: fields })
}
