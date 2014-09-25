'use strict';

var gulp = require('gulp');

module.exports = function (tasks) {
    for (var name in tasks) {
        gulp.task(name, (tasks[name] || []), require('./tasks/' + name));
    };

    return gulp;
};
