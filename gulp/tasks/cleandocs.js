'use strict';

var spawn = require('child_process').spawn;

module.exports = function (cb) {
    var cmd = spawn('rm', ['-rf', 'dist/docs/*']);
    cmd.on('close', function () {
        cb();
    });
};
