MapRepo = {
  changeViewCoordinates: function (id, zoom_level, file_name, x, y) {
    history.pushState({}, "", '/quest/' + id + '/' + zoom_level + '/' + file_name + '/' + x + '/' + y);
  }
}
