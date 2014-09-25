'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

module.exports = function () {
    return gulp.src([
            'src/**/*.js',
            'test/**/*.js'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', function (e) {
            // Process ends on JSHint failures
            gutil.log('JSHint failed: ' + e.message);
            process.exit(1);
        });
};
