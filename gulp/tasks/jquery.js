'use strict';

var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var insert = require('gulp-insert');

// var utils = require(process.cwd() + '/gulp/utils');

module.exports = function () {
    return gulp.src(['src/jquery_source/$.*.js'])
        .pipe(concat('$.build.js', {
            newLine: '\n\n'
        }))
        .pipe(insert.wrap(
          fs.readFileSync('src/jquery_source/$.banner.tmpl'),
          fs.readFileSync('src/jquery_source/$.foot.tmpl')
        ))
        .pipe(gulp.dest('src'));
};
