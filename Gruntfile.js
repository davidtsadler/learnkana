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
            localhost: ['.tmp'],
            dist: ['dist', '.tmp']
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {expand: true, cwd: 'app/', src: '**/*.html', dest: '.tmp/htmlmin/'},
                ]
            }
        },
        cssmin: {
            dist: {
                files: [
                    {expand: true, cwd: 'app/css/', src: '**/*.css', dest: '.tmp/cssmin/css/', ext: '.css'}
                ],
            }
        },
        copy: {
            localhost: {
                files: [
                    {expand: true, cwd: 'app/', src: ['**'], dest: '.tmp/localhost/'}
                ]
            },
            dist: {
                files: [
                    {expand: true, cwd: '.tmp/htmlmin/', src: '**', dest: 'dist/'},
                    {expand: true, cwd: '.tmp/cssmin/', src: '**', dest: 'dist/'},
                    {expand: true, cwd: 'app/vendor/', src: ['**'], dest: 'dist/vendor/'},
                    {expand: true, cwd: 'app/js/', src: ['**'], dest: 'dist/js/'}
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
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
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
        'htmlmin',
        'cssmin',
        'copy:dist'
    ]);
};
