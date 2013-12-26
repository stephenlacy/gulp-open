var gulp = require("gulp");
var open = require("../");

gulp.task("open", function(){
  var options = {
    url: "http://google.com",
    app: "google-chrome"
  };
  gulp.src("./")
  .pipe(open(options));
});



gulp.task("default", function(){
  gulp.run("open");
});