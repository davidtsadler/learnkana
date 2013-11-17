'use strict';

module.exports = function(grunt) {

    grunt.initConfig({
        paths: {
            app: 'app',
            dist: 'dist',
            tmp: '.tmp'
        },
        jshint: {
            all: ['Gruntfile.js', '<%= paths.app %>/js/**/*.js'],
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
            src: '<%= paths.app %>/css/**/*.css'
        },
        clean: {
            localhost: ['<%= paths.tmp %>'],
            dist: ['<%= paths.dist %>', '<%= paths.tmp %>']
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {expand: true, cwd: '<%= paths.app %>/', src: '**/*.html', dest: '<%= paths.tmp %>/htmlmin/'},
                ]
            }
        },
        cssmin: {
            dist: {
                files: [
                    {expand: true, cwd: '<%= paths.app %>/css/', src: '**/*.css', dest: '<%= paths.tmp %>/cssmin/css/', ext: '.css'}
                ],
            }
        },
        uglify: {
            dist: {
                options: {
                      mangle: false
                },
                files: [
                    {expand: true, cwd: '<%= paths.app %>/js/', src: '**/*.js', dest: '<%= paths.tmp %>/uglify/js/', ext: '.js'}
                ]
            }
        },
        copy: {
            localhost: {
                files: [
                    {expand: true, cwd: '<%= paths.app %>/', src: ['**'], dest: '<%= paths.tmp %>/localhost/'}
                ]
            },
            dist: {
                files: [
                    {expand: true, cwd: '<%= paths.tmp %>/htmlmin/', src: '**', dest: '<%= paths.dist %>/'},
                    {expand: true, cwd: '<%= paths.tmp %>/cssmin/', src: '**', dest: '<%= paths.dist %>/'},
                    {expand: true, cwd: '<%= paths.tmp %>/uglify/', src: '**', dest: '<%= paths.dist %>/'},
                    {expand: true, cwd: '<%= paths.app %>/vendor/', src: ['**'], dest: '<%= paths.dist %>/vendor/'},
                    {src: '<%= paths.app %>/robots.txt', dest: '<%= paths.dist %>/robots.txt'}
                ]
            }
        },
        watch: {
            html: {
                files: '<%= paths.app %>/**/*.html',
                tasks: 'build:localhost'
            },
            js: {
                files: '<%= paths.app %>/js/**/*.js',
                tasks: 'build:localhost'
            },
            css: {
                files: '<%= paths.app %>/css/**/*.css',
                tasks: 'build:localhost'
            },
            vendor: {
                files: '<%= paths.app %>/vendor/**/*.*',
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
                    base: '<%= paths.tmp %>/localhost'
                }
            },
            dist: {
                options: {
                    base: '<%= paths.dist %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
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
        'uglify',
        'copy:dist'
    ]);
};
