var gulp = require('gulp');
var gutil = require('gulp-util');

module.exports = {
    /**
     * This method builds our license string for embedding into the compiled file
     */
    license: function () {
        var pkg = require(process.cwd() + '/package.json');
        var licenses = [];
        pkg.licenses.forEach(function (license) {
            licenses.push(license.type);
        });

        return '/*! ' + pkg.name + ' - v' + pkg.version + ' - ' + gutil.date("yyyy-mm-dd") + "\n" +
            (pkg.homepage ? "* " + pkg.homepage + "\n" : "") +
            '* Copyright (c) ' + gutil.date("yyyy") + ' ' + pkg.author.name +
            '; Licensed ' + licenses.join(', ') + ' */\n';
    }
};