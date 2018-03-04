var gulp        = require('gulp');
var fs          = require('fs');
var csv2json    = require('gulp-csv2json');
var jsonToYaml  = require('gulp-json-to-yaml');






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



