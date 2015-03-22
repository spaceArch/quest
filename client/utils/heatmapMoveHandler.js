HeatmapMoveHandler = {
  handle: function(opts) {
    if(opts.zoom >= 5) {
      var floored_x = Math.floor(opts.x/100)*100
      var floored_y = Math.floor(opts.y/100)*100

      if(Session.get('last_x') != floored_x || Session.get('last_y') != floored_y) {
        console.log('send move');
        console.log(floored_x, floored_y);

        var latlon = opts.rc.unproject([floored_x, floored_y]);

        var lat = parseFloat(latlon.lat.toFixed(5));
        var lon = parseFloat(latlon.lng.toFixed(5));

        Meteor.call('handleMove', {
          lat: lat,
          lon: lon,
          image: opts.image,
          quest_id: opts.quest_id
        });
      }

      Session.set('last_x', floored_x);
      Session.set('last_y', floored_y);
    }
  }
}
