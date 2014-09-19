'use strict';

var gulp = require('gulp');

module.exports = function () {
    var argv = require('yargs').argv;
    if (!argv.all && !argv.src && !argv.test) {
        argv.all = true;
    }

    if (argv.all || argv.src) {
        gulp.watch(["src/jquery_source/$.*.js", "!src/*.build.js"], ['jquery']);
        gulp.watch(["src/_source/_.*.js", "!src/*.build.js"], ['undermore']);
    }

    if (argv.all || argv.test) {
        gulp.watch(["test/**/*.js"], ['jshint', 'qunit']);
    }
};