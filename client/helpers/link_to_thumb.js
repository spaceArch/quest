Handlebars.registerHelper("linkToThumb", function(images) {
  var imagePath = images[0].previewPath
  return '/' + imagePath;
});

Handlebars.registerHelper("countImages", function(images) {
  return images.length;
});