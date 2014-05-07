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
                    separator: ', \n ',
                    banner: '<%= banner_undermore %>',
                    footer: '<%= foot_undermore %>'
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
                    'src/_.build.js',
                    'src/$.build.js',
                    'src/safe.js',
                    'src/string.*.js'
                ],
                dest: 'dist/undermore.js'
            },
            bin: {
                src: ['src/*.js'],
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
                options: {
                    jshintrc: 'src/.jshintrc',
                    ignore: 'src/_source'
                },
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
        dox: {
            options: {
                title: "Undermore Documentation"
            },
            files: {
                src: ['src/'],
                dest: 'dist/docs'
            }
        },
        jsdoc: {
            dist: {
                src: [
                    'dist/undermore.js'
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
                    '<%= concat.dist.src %>'
                ],
                tasks: ['concat', 'jshint:src', 'uglify', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            },
            doc: {
                files: '<%= jsdoc.dist.src %>',
                tasks: ['jsdoc']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-dox');
    grunt.loadNpmTasks('grunt-jsdoc');
    // Automatic notifications when tasks fail.
    grunt.loadNpmTasks('grunt-notify');
    // grunt-notify options handler
    grunt.task.run('notify_hooks');

    // Default task.
    grunt.registerTask('default', ['concat', 'jshint', 'uglify', 'jsdoc', 'qunit', 'notify:done']);
    grunt.registerTask('build', ['concat', 'jshint', 'uglify', 'jsdoc', 'notify:done']);

};