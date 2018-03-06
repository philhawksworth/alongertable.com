var gulp        = require('gulp');
var fs          = require('fs');
var csv2json    = require('gulp-csv2json');
var jsonToYaml  = require('gulp-json-to-yaml');
var sass        = require("gulp-sass");
var hash        = require("gulp-hash");
var concat      = require("gulp-concat");
var clean       = require('gulp-clean');
var serve       = require('gulp-serve');

var buildDest = "public";
var buildSrc = "src";


// local webserver for development
gulp.task('serve', serve({
  root: [buildDest],
  port: 8008,
}));



// simplest possible noddy js management
gulp.task("js", function () {
  return gulp.src(buildSrc + "/js/**/*.js")
    .pipe(concat('alongertable.js'))
    .pipe(gulp.dest('static/js'))
});



// Compile SCSS files to CSS
gulp.task("scss", ['clean-css'], function () {

  //compile hashed css files
  gulp.src("src/scss/main.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(hash())
    .pipe(gulp.dest("themes/simple/static/css"))
    .pipe(hash.manifest("hash.json"))
    .pipe(gulp.dest("data/css"))
});

// Delete our old css files
gulp.task('clean-css', function () {
  return gulp.src('themes/simple/static/css/**/*', {read: false})
    .pipe(clean());
});

// cleanup the build output
gulp.task('clean-build', function () {
  return gulp.src(buildDest, {read: false})
    .pipe(clean());
});







gulp.task('import', function () {
  gulp.src('src/**/*.csv')
    .pipe(csv2json({}))
    .pipe(gulp.dest('src'));
});


gulp.task('yamlify', function () {
  gulp.src('src/**/*.json')
    .pipe(jsonToYaml())
    .pipe(gulp.dest('data'))
});


// generate content pages from a csv import
// CAUTION : This will overwrite content edits made after previous imports
// This is to seed the site only
gulp.task('get:addresses', function () {

  // read json
  var data = fs.readFileSync('src/apartments.json', 'utf8');
  var data = JSON.parse(data);

  // save frontmatter for each entry into a file
  for(var place in data) {
    var file = data[place].name;
    file = file.replace(/ /g,"-");
    file = file.replace(/\./g,"");
    file = file.replace(/#/g,"Number ");
    file = file.toLowerCase();

    var matter = `---
title: ${data[place].name}
phone: ${data[place].phone}
website: ${data[place].website}
management: ${data[place].management}
location: "San Jose"
tags: []
---`

    fs.writeFile("content/place/" + file + ".md", matter , function(err) {
      if(err) {
        console.log(err);
      }
    });
  }

});







// Watch src folder for changes
gulp.task("watch", ["scss", "js"], function () {
  gulp.watch("src/scss/**/*", ["scss"])
  gulp.watch("src/js/**/*", ["js"])
});
