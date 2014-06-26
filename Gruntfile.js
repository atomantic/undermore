'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        banner_undermore: grunt.file.read('src/_source/_.banner.tmpl'),
        foot_undermore: grunt.file.read('src/_source/_.foot.tmpl'),
        banner_jquery: grunt.file.read('src/jquery_source/$.banner.tmpl'),
        foot_jquery: grunt.file.read('src/jquery_source/$.foot.tmpl'),
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>'
            },
            undermore: {
                options: {
                    separator: ',\n',
                    banner: '<%= banner_undermore %>',
                    footer: '<%= foot_undermore %>',
                    process: function(src) {
                        var lines = src.replace('_.mixin({\n','').split('\n'),
                            last = lines.pop();
                        // handle empty lines at the end of the file
                        while(last===''){
                            last = lines.pop();
                        }   
                        return lines.join('\n');
                    }
                },
                src: ['src/_source/_.*.js'],
                dest: 'src/_.build.js'
            },
            jquery: {
                options: {
                    separator: '\n\n',
                    banner: '<%= banner_jquery %>',
                    footer: '<%= foot_jquery %>'
                },
                src: ['src/jquery_source/$.*.js'],
                dest: 'src/$.build.js'
            },
            dist: {
                src: [
                    'src/_.build.js'
                ],
                dest: 'dist/undermore.js'
            },
            docs:{
                src: [
                    'src/safe.js',
                    'src/_.build.js',
                    'src/$.build.js',
                    'src/string.*.js'
                ],
                dest: 'dist/docs/all.js'
            },
            bin: {
                src: '<%= concat.dist.src %>',
                dest: 'bin/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        qunit: {
            files: ['test/*.html']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            }
        },
        notify: {
            done: {
                options: {
                    message: 'Build Success!'
                }
            }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5
            }
        },
        jsdoc: {
            dist: {
                src: [
                    'dist/docs/all.js'
                ],
                options: {
                    destination: 'dist/docs'
                }
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: [
                    '<%= concat.undermore.src %>',
                    '<%= concat.jquery.src %>',
                    '!src/*.build.js'
                ],
                tasks: ['concat', 'jshint:src', 'uglify', 'qunit', 'shell:clean']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            }
        },
        shell:{
            cleandocs:{
                options: {
                    stderr: false
                },
                command: 'rm -rf dist/docs/*'
            },
            clean:{
                options: {
                    stderr: false
                },
                command: 'git checkout src/*build.js; git checkout bin; git checkout dist/docs; git checkout dist/undermore*'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-shell');
    // Automatic notifications when tasks fail.
    grunt.loadNpmTasks('grunt-notify');
    // grunt-notify options handler
    grunt.task.run('notify_hooks');

    // Default task (grunt will use this + any defined on watches)
    // TODO: figure out why and limit grunt watch
    grunt.registerTask('default', []);
    // actual distribution build
    grunt.registerTask('build', ['shell:cleandocs', 'concat', 'jshint', 'uglify', 'qunit', 'jsdoc', 'notify:done']);
    // build docs
    grunt.registerTask('docbuild', ['shell:cleandocs', 'concat', 'jshint', 'uglify', 'jsdoc', 'notify:done']);

};