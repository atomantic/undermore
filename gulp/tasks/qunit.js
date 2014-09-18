'use strict';

var gulp = require('gulp');
var qunit = require('gulp-qunit');

module.exports = function () {
    return gulp.src(['test/*.html'])
        .pipe(qunit());
};