Handlebars.registerHelper("getDateTime", function(timestamp) {
  return moment(timestamp).format('LLL');
});