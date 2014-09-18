'use strict';

var fs = require('fs');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var insert = require('gulp-insert');
var concat = require('gulp-concat');

var utils = require(process.cwd() + '/gulp/utils');

/**
 * This method is used as a modifier for minification to clean up
 * the stream a bit.
 */
function cleanContent() {
    function transform(file, cb) {
        file.contents = new Buffer((function (src) {
            var lines = src.replace('_.mixin({\n','').split('\n'),
                last = lines.pop();
            // handle empty lines at the end of the file
            while(last===''){
                last = lines.pop();
            }
            return lines.join('\n');
        })(String(file.contents)));
        cb(null, file);
    }

    return require('event-stream').map(transform);
}

module.exports = function (cb) {
    gulp.src(['src/_source/_.*.js'])
        .pipe(cleanContent())
        .pipe(concat('undermore.js', {
            newLine: ',\n'
        }))
        .pipe(insert.wrap(fs.readFileSync('src/_source/_.banner.tmpl'), fs.readFileSync('src/_source/_.foot.tmpl')))
        .pipe(insert.wrap(utils.license(), "\n"))
        .pipe(gulp.dest('dist/'))
        .on('end', function () {
            // Just built, so now uglify as well
            gulp.src(['dist/undermore.js'])
                .pipe(rename(function (path) {
                    path.extname = '.min.js'
                }))
                .pipe(uglify())
                .on('error', function (e) {
                    return cb(e);
                })
                .pipe(insert.prepend(utils.license()))
                .pipe(gulp.dest('dist/'))
                .on('end', function () {
                    cb();
                });
        });
};
