'use strict';

var open = require('open');
var through = require('through2');
var gutil = require('gulp-util');

var log = gutil.log;
var colors = gutil.colors;
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-open';

// The acceptable uri formats for opening
var ACCEPTABLE_URI_FORMATS = ['/', 'file://', 'http://', 'https://'];

module.exports = function(src, opt) {

  opt = opt || {};
  var plugInErrors = [];
  if (!src && !opt.uri) {
    plugInErrors.push(new PluginError(PLUGIN_NAME, 'URI is missing or incorrect! Use the ' +
      'src or the options to indicate a uri ' + ACCEPTABLE_URI_FORMATS));
  }

  return through.obj(function(file, enc, cb) {

    if (plugInErrors.length > 0) {
      cb(null, plugInErrors[0]);
    }
    if (file.isNull()) {
      return cb(null, file); // pass along
    }
    if (file.path)  {
      opt.uri = file.path;
    }

    var selectedType = 'none';
    // If the uri was not passed either by the stream nor by the options
    if (plugInErrors.length === 0) {
      var indexOfAnyFormat = _getIndexesOfAcceptableFormats(opt.uri);
      if (indexOfAnyFormat === -1) {
        plugInErrors.push(new PluginError(PLUGIN_NAME, 'URI is missing or incorrect! Please ' +
          'use one of ' + ACCEPTABLE_URI_FORMATS));

      } else {
        // If the type is the index value in the range of files
        selectedType = indexOfAnyFormat <= 1 ? 'file' : 'url';
      }
    }

    if (opt.app) {
      log(colors.blue('Opening the', selectedType, colors.green(opt.uri), 'using the app',
        colors.green(opt.app)));
      // Open with the given app
      open(opt.uri, opt.app);
 
    } else {
     log(colors.blue('Opening the', selectedType, colors.green(opt.uri), 'using the',
        colors.green('default OS app')));
     // Open with the default app defined by the os
     open(opt.uri);
    }
  });
};

/**
 * In addition to the regular path
 * > _followsFormat('github.com')   > _followsFormat('http://github.com')
 * false                            true
 * > _followsFormat('file://dsdsd') > _followsFormat('/usr/bin') 
 * true                             true
 *
 * @return The index of which type of the acceptable types the uri is from.
 */
function _getIndexesOfAcceptableFormats(uri) {
  return ACCEPTABLE_URI_FORMATS.map(function(formatPrefix) {
    return uri.indexOf(formatPrefix) === 0;

  }).reduce(function(acc, value, index) {
    return value ? index : acc;
  }, false);
}
