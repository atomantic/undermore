'use strict';

var gulp = require('gulp');
var spawn = require('child_process').spawn;

var commands = [
    ['git', ['checkout', 'src/*build.js']],
    ['git', ['checkout', 'bin']],
    ['git', ['checkout', 'dist/docs']],
    ['git', ['checkout', 'dist/undermore*']]
];

function next(cb) {
    if (commands.length > 0) {
        var proc = spawn.apply(spawn, commands.shift());
        proc.on('close', function () {
            next(cb);
        });
    } else {
        cb();
    }
}

module.exports = function (cb) {
    next(cb);
};