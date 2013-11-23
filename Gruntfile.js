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
        useminPrepare: {
            html: '<%= paths.app %>/index.html',
            options: {
                dest: '<%= paths.dist %>'
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= paths.dist %>/js/{,*/}*.js',
                        '<%= paths.dist %>/css/{,*/}*.css',
                    ]
                }
            }
        },
        usemin: {
            html: ['<%= paths.tmp %>/{,*/}*.html'],
            css: ['<%= paths.dist %>/css/{,*/}*.css'],
            options: {
                dirs: ['<%= paths.dist %>']
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [
                    {expand: true, cwd: '<%= paths.tmp %>/usemin/', src: '**/*.html', dest: '<%= paths.dist %>'},
               ]
            }
        },
        copy: {
            localhost: {
                files: [
                    {expand: true, cwd: '<%= paths.app %>/', src: ['**'], dest: '<%= paths.tmp %>/localhost/'}
                ]
            },
            usemin: {
                files: [
                    {expand: true, cwd: '<%= paths.app %>/', src: ['**/*.html'], dest: '<%= paths.tmp %>/usemin/'}
                ]
            },
            dist: {
                files: [
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
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bump');

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
        'useminPrepare',
        'concat',
        'copy:usemin',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'htmlmin:dist',
        'copy:dist'
    ]);
};
