var open = require('open');
var es = require('event-stream');
var gutil = require('gulp-util');

module.exports = function(src, opt) {

  return es.map(function (file, cb){
    if (!opt) opt = {};
    var cmd = gutil.template(src, {file:file});
    
    if (!opt.app) {
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