[![Build Status](https://travis-ci.org/stevelacy/gulp-open.png?branch=master)](https://travis-ci.org/stevelacy/gulp-open)

[![NPM version](https://badge.fury.io/js/gulp-open.png)](http://badge.fury.io/js/gulp-open)

#gulp-open

<table>
<tr> 
<td>Package</td><td>gulp-open</td>
</tr>
<tr>
<td>Description</td>
<td>Open files and URLs with gulp</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.8</td>
</tr>
</table>

## Usage

```javascript
var gulp = require("gulp");
var open = require("gulp-open");

// Open an URL:

gulp.task("open", function(){
  var options = {
    url: "http://google.com",
    app: "google-chrome"
  };
  gulp.src("./")
  .pipe(open(options));
});

// Open a local file:
// If app is not declared the default webbrowser will be used

gulp.task("open", function(){
  var options = {
    url: "./examples/index.html"
  };
  gulp.src("./")
  .pipe(open(options));
});


// Short version:

gulp.task("open", function(){
  gulp.src("./")
  .pipe(open({url:"http://slacy.me"));
});




// Run the task with gulp

gulp.task("default", function(){
  gulp.run("open");
});
```



##Options

`.pipe(open(Object Options))`

###url, file (Required)
`String, website or local URL`

```javascript
url: "http://google.com"

///
file: "/var/www/htdocs/index.html"
```


###app
`String, local application`

NOTE: If the app is not defined, the Default application will be used for the filetype/URL.

```javascript
app: "google-chrome"

///

app: "sublime"
```


##[Grunt Example](https://github.com/stevelacy/gulp-open/tree/master/examples)

## LICENSE

(MIT License)

Copyright (c) 2013 Steve Lacy slacy.me - Fractal <contact@wearefractal.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
