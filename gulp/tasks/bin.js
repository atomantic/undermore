'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var insert = require('gulp-insert');

var pkg = require(process.cwd() + '/package.json');
var utils = require(process.cwd() + '/gulp/utils');

module.exports = function () {
    return gulp.src(['src/_.build.js'])
        .pipe(concat(pkg.name + '.js'))
        .pipe(insert.wrap(utils.license(), "\n"))
        .pipe(gulp.dest('bin'));
};