'use strict';

var gulp = require('gulp');
var lint = require('gulp-eslint');

module.exports = function () {
    return gulp.src([
            'src/**/*.js',
            'test/**/*.js'
        ])
        .pipe(lint())
        .pipe(lint.format())
        .pipe(lint.failAfterError());
};
