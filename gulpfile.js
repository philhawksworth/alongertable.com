var gulp = require('gulp');
var csv2json = require('gulp-csv2json');
var jsonToYaml = require('gulp-json-to-yaml');



var options = {};
gulp.task('import', function () {
    gulp.src('src/**/*.csv')
      .pipe(csv2json(options))
      .pipe(gulp.dest('src'));
});


gulp.task('yamlify', function () {
  gulp.src('src/**/*.json')
    .pipe(jsonToYaml())
    .pipe(gulp.dest('data'))
});



