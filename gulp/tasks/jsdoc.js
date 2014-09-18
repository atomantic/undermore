'use strict';

var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc');

module.exports = function () {
    return gulp.src(['dist/docs/all.js'])
        .pipe(jsdoc('dist/docs'));
};