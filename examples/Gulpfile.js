var gulp = require("gulp");
var open = require("../");

gulp.task("open", function(){
  gulp.src("./*.html")
  .pipe(open("<%file.path%>","google-chrome"));
});



gulp.task("default", function(){
  gulp.run("open");
});