'use strict';

var gulp = require('./gulp')({
    'bin': [],
    'clean': [],
    'cleandocs': [],
    'qunit': [],
    'jquery': [],
    'jsdoc': [],
    'lint': [],
    'watch': [],
    'docs': ['clean', 'cleandocs'],
    'undermore': ['lint']
});

// Task list
gulp.task('default', []);
gulp.task('test', ['jquery', 'undermore', 'bin', 'qunit']);
gulp.task('build', ['docs', 'jquery', 'undermore', 'bin', 'qunit', 'jsdoc']);
gulp.task('docbuild', ['docs', 'jquery', 'undermore', 'bin', 'jsdoc']);
