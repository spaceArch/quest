F = {
  getFilterString: function(filters, query){
    if(!filters) {
      return "";
    }

    var start = filters.indexOf(query);
    var end = 1 + filters.indexOf(")", start);
    return filters.substring(start, end);
  },

  getAllFilters: function(elem){
    return  elem.style.filter ||
            elem.style.webkitFilter ||
            elem.style.OFilter ||
            elem.style.mozFilter ||
            elem.style.msFilter;
  },

  setAllFilters: function(elem, filters){
    elem.style.filter = filters;
    elem.style.webkitFilter = filters;
    elem.style.OFilter = filters;
    elem.style.mozFilter = filters;
    elem.style.msFilter = filters;
  },

  updateFilter: function(layerElem, name, value){
    allFilters = F.getAllFilters(layerElem);
    lastFilter = F.getFilterString(allFilters, name);
    newFilter = name + "(" + value + ")";
    newAllFilters = allFilters.replace(lastFilter, newFilter)
    F.setAllFilters(layerElem, newAllFilters);
    F.setToProfile(newAllFilters);
  },

  getFromProfile: function (){
    try {
      return Meteor.user().profile.filters;
    } catch(e){
      return undefined
    }
  },

  setToProfile: function (val){
    Meteor.users.update(Meteor.userId(), { $set: {'profile.filters': val} });
  },

  getIinitialFilter: function (name){
    allFilters =F.getFromProfile();
    var match = F.getFilterString(allFilters, name).match(/\d+\.?\d*/);

    if(!match) {
      return
    }
    else {
      return match[0];
    }
  },
};
