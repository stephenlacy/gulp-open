var open = require('open');
var map = require('map-stream');
var gutil = require('gulp-util');

module.exports = function(src, opt) {

  return map(function (file, cb){
    if (file.isNull()) return cb(null, file); // pass along
    if (file.isStream()) return cb(new Error("gulp-open: Streaming not supported")); // pass error if streaming is not supported
    if (!opt) opt = {};
    var cmd = gutil.template(src, {file:file});
    
    if (!opt.app && !opt.url) {
      open(file.path);
      return true;
    }
    if(opt.url){
      open(opt.url, opt.app);
      return true;
    }
    // Run normally
    open(cmd, opt.app);
    cb(null, true);
  });
};