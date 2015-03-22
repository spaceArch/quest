Handlebars.registerHelper("linkToThumb", function(images) {
  var imagePath = images[0].previewPath
  return 'http://188.226.222.86:8080/' + imagePath;
});