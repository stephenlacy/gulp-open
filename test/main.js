var gulpopen = require('../');
var should = require('should');
require('mocha');

describe('gulp-open', function() {
  it('should open a website in a browser', function(done) {
    gulpopen({url:"http://google.com"}, done());
  });
});
