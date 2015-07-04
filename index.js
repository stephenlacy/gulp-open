var es = require('event-stream');
var fs = require('fs');
var open = require('open');
var gutil = require('gulp-util');

var log = gutil.log;
var colors = gutil.colors;
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-open';

// The acceptable uri formats for opening
var ACCEPTABLE_URI_FORMATS = ["/", "file://", "http://", "https://"];

// Main plugin
var gulpOpen = function(opt) {

  var stream;
  opt = opt || {};

  // Executes the opening based on a given uri
  var executeOpening = function() {
    if (!opt.uri) {
      stream.emit("error", new PluginError(PLUGIN_NAME, "URI is missing or incorrect! Use the src or the " + 
        "options to indicate a uri " + ACCEPTABLE_URI_FORMATS));
    }

    // If the uri was not passed either by the stream nor by the options
    var indexOfIndexOf = _indexOfIndexOf(opt.uri);
    if (indexOfIndexOf === -1) {
      stream.emit("error", new PluginError(PLUGIN_NAME, "URI is missing or incorrect! Please use one of " + ACCEPTABLE_URI_FORMATS));
    }

    // If the type is the index value in the range of files
    var selectedType = indexOfIndexOf <= 1 ? "file" : "url";
    console.log(indexOfIndexOf);

    // If provided by the user using the options and not the stream, verify if the file exists first
    if (selectedType === "file" && !opt.uriFromStream) {
      try {
        fs.statSync(opt.uri);

      } catch (FileNotFoundError) {
	 console.log(FileNotFoundError);
        stream.emit("error", new PluginError(PLUGIN_NAME, "File path " + opt.uri + " not found!"));
      }
    }

    // Open the file with the default app in the OS
    if (!opt.app) {
      log(colors.blue('Opening the', selectedType, colors.green(opt.uri), 'using the', colors.green('default OS app')));
      open(opt.uri);

    } else {
      log(colors.blue('Opening the', selectedType, colors.green(opt.uri), 'using the app', colors.green(opt.app)));
      open(opt.uri, opt.app);
    }
  };

  function done() {
    // End the stream if it exists
    if (stream) {
      stream.emit('end');
    }
  }

  // Handles opening the file through the stream
  var queueFile = function(file) {
    console.log(file);
    // Just get the path and inject it to the options to be processed.
    opt.uri = file.path;
    opt.uriFromStream = true;
  };

  // Open the object, whatever that is.
  var endStream = function() {
    executeOpening();
  };

  // copied from gulp-karma
  stream = es.through(queueFile, endStream);

  return stream;
}

/**
 * In addition to the regular path
 * > _followsFormat("github.com")   > _followsFormat("http://github.com")
 * false                            true
 * > _followsFormat("file://dsdsd") > _followsFormat("/usr/bin") 
 * true                             true
 *
 * @return The index of which type of the acceptable types the uri is from.
 */
function _indexOfIndexOf(uri) {
  return ACCEPTABLE_URI_FORMATS.map(function(formatPrefix) {
    return uri.indexOf(formatPrefix) === 0;

  }).reduce(function(acc, value, index) {
    return value ? index : acc;
  }, false);
}

module.exports = gulpOpen;
