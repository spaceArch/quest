Meteor.startup(function () {
  var path = Npm.require('path');

  var store = path.join(process.env.SPACE_ARCH_PATH, 'store');
  var tmp = path.join(store, 'tmp');

  UploadServer.init({
    tmpDir: tmp,
    uploadDir: store,
    checkCreateDirectories: true,
    getDirectory: function(info, data) {
      var path = Npm.require('path');
      var questId = data.questId;
      var dir = path.join('quest_' + questId, 'images');

      return dir;
    }
  })
});
