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
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['src/*.js'],
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
            files: ['test/**/*.html']
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
                    jshintrc: 'src/.jshintrc'
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
                src: ['src/*.js'],
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
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
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
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'jsdoc', 'qunit', 'notify:done']);

};