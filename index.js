var open = require("open");
var es = require('event-stream');

module.exports = function(options, app) {

  var url = options.url || options.file;

  return es.map(function (file, cb){

    var path = file.path;

    // Check if URL
    if (options.url || options.file) {
      open(url, options.app||app);
      cb(null, true);
      return true;
    }
    // Run normally
    open(path, app);
    cb(null, true);
  });
};