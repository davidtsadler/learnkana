'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'app/js/**/*.js'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true,
                strict: false,
                globals: {
                    'window': false,
                    'angular': false,
                    'learnKanaApp': true
                }
            }
        },
        csslint: {
            options: {
                'known-properties': false,
                'box-sizing': false
            },
            src: 'app/css/**/*.css'
        },
        clean: {
            localhost: ['.tmp/localhost'],
            dist: ['dist']
        },
        copy: {
            localhost: {
                files: [
                    {expand: true, cwd: 'app/', src: ['**'], dest: '.tmp/localhost/'}
                ]
            },
            dist: {
                files: [
                    {expand: true, cwd: 'app/', src: ['**'], dest: 'dist/'}
                ]
            }
        },
        watch: {
            html: {
                files: 'app/**/*.html',
                tasks: 'build:localhost'
            },
            js: {
                files: 'app/js/**/*.js',
                tasks: 'build:localhost'
            },
            css: {
                files: 'app/css/**/*.css',
                tasks: 'build:localhost'
            },
            vendor: {
                files: 'app/vendor/**/*.*',
                tasks: 'build:localhost'
            }
        },
        connect: {
            options: {
                hostname: '*',
                keepalive: true
            },
            localhost: {
                options: {
                    base: '.tmp/localhost'
                }
            },
            dist: {
                options: {
                    base: 'dist'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build:localhost', [
        'jshint',
        'csslint',
        'clean:localhost',
        'copy:localhost'
    ]);

    grunt.registerTask('build:dist', [
        'jshint',
        'csslint',
        'clean:dist',
        'copy:dist'
    ]);
};
