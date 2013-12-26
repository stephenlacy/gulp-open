var open = require("open");
var es = require('event-stream');

module.exports = function(options) {
  if(!options.url){
    throw new Error('URL is blank');
  }

  var url = options.url || options.file;

  return es.map(function (file, cb){
    if(options.app){
      open(url, options.app);
      cb(null, true);
      return true;
    }
    open(url);
    cb(null, true);
  });
};