'use strict';

var fs = require('node:fs');
var path = require('node:path');

var root = path.resolve(__dirname, '..');
var packageJson = require(path.join(root, 'package.json'));
var sourceDirectory = path.join(root, 'src', '_source');
var checkOnly = process.argv.includes('--check');

function normalizeLineEndings(source) {
    return source.replace(/\r\n?/g, '\n');
}

function read(relativePath) {
    return normalizeLineEndings(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function extractMixin(filename) {
    var source = normalizeLineEndings(fs.readFileSync(path.join(sourceDirectory, filename), 'utf8'));
    var startMarker = '_.mixin({';
    var start = source.indexOf(startMarker);
    var end = source.lastIndexOf('});');

    if (start === -1 || end === -1 || end <= start) {
        throw new Error('Unable to extract mixin from ' + filename);
    }

    return source.slice(start + startMarker.length, end).trim();
}

function license() {
    return [
        '/*! ' + packageJson.name + ' - v' + packageJson.version,
        ' * ' + packageJson.homepage,
        ' * Copyright (c) 2013 ' + packageJson.author.name + '; Licensed MIT */'
    ].join('\n');
}

function build() {
    var sourceFiles = fs.readdirSync(sourceDirectory)
        .filter(function(filename) {
            return /^_\..+\.js$/.test(filename);
        })
        .sort();
    var banner = read('src/_source/_.banner.tmpl').trimEnd();
    var footer = read('src/_source/_.foot.tmpl').trim();
    var mixins = sourceFiles.map(extractMixin).join(',\n');

    return license() + '\n' + banner + '\n' + mixins + '\n' + footer + '\n';
}

var output = build();
var targets = [
    'src/_.build.js',
    'bin/undermore.js'
];
var staleTargets = targets.filter(function(target) {
    var absoluteTarget = path.join(root, target);
    return !fs.existsSync(absoluteTarget) || fs.readFileSync(absoluteTarget, 'utf8') !== output;
});

if (checkOnly) {
    if (staleTargets.length > 0) {
        console.error('Generated files are stale: ' + staleTargets.join(', '));
        console.error('Run `npm run build` and commit the results.');
        process.exitCode = 1;
    }
} else {
    staleTargets.forEach(function(target) {
        fs.writeFileSync(path.join(root, target), output);
    });
    console.log('Built ' + targets.join(' and '));
}
