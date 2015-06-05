'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var insert = require('gulp-insert');

var utils = require(process.cwd() + '/gulp/utils');

module.exports = function () {
    return gulp.src([
            'src/safe.js',
            'src/_.build.js',
            'src/$.build.js',
            'src/string.*.js'
        ])
        .pipe(concat('all.js'))
        .pipe(insert.wrap(utils.license(), '\n'))
        .pipe(gulp.dest('dist/docs'));
};
