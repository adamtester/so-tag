module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        src_files_js: ['js/so_tag.js'],
        src_files_css: ['css/*.css'],
        src_files_other: ['*.json', '*.php', 'LICENSE', 'README.md', '!package.json'],
        dest_dir_dev: 'build/dev/',
        dest_dir_rel: 'build/release/',
        dest_dir_dual: 'build/dual/',
        uglify: {
            main: {
                files: [{
                    expand: true,
                    cwd: '',
                    src: '<%= src_files_js %>',
                    dest: '<%= grunt.option("outpath") %>',
                    ext: '.min.js'
                }]
            },
        },
        jshint: {
            main: {
                src: ['<%= src_files_js %>']
            },
        },
        copy: {
            build_release: {
                src: ['<%= src_files_other %>'],
                dest: '<%= dest_dir_rel %>',
            },
            build_dev: {
                src: ['<%= src_files_js %>', '<%= src_files_css %>', '<%= src_files_other %>'],
                dest: '<%= dest_dir_dev %>',
            },
            build_dual: {
                src: ['<%= src_files_js %>', '<%= src_files_css %>', '<%= src_files_other %>'],
                dest: '<%= dest_dir_dual %>',
            }
        },
        cssmin: {
            main: {
                options : {
                    report: 'gzip'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'css',
                        src: ['*.css', '!*.min.css'],
                        dest: '<%= grunt.option("outpath") %>/css/',
                        ext: '.min.css'
                    }]
            },
        },
        clean: {
            main: {
                src: ['<%= grunt.option("outpath") %>*']
            },
        },
        compress: {
            build_release: {
                options: {
                    mode: 'zip',
                    archive: 'build/SOTag.<%= pkg.version %>.zip'
                },
                cwd: '<%= dest_dir_rel %>',
                src: ['**/*'],
                dest: 'SOTag/',
                expand: true
            },
            build_dev: {
                options: {
                    mode: 'zip',
                    archive: 'build/SOTag.DEV.<%= pkg.version %>.zip'
                },
                cwd: '<%= dest_dir_dev %>',
                src: ['**/*'],
                dest: 'SOTag/',
                expand: true
            },
            build_dual: {
                options: {
                    mode: 'zip',
                    archive: 'build/SOTag.FULL.<%= pkg.version %>.zip'
                },
                cwd: '<%= dest_dir_dual %>',
                src: ['**/*'],
                dest: 'SOTag/',
                expand: true
            }
        },
        csscomb: {
            main: {
                expand: true,
                cwd: 'css/',
                src: ['*.css'],
                dest: 'css/'
            }
        },
        newer: {
            options: {
                cache: 'node_modules/grunt-newer/.cache/<%= grunt.option("outpath") %>'
            }
        }
    });
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    //custom task:
    grunt.registerTask('set_option', 'Set a global variable.', function (name, val) {
        grunt.option(name, val);
        if (name === 'outpath') {
            grunt.log.writeln("Output folder is now: " + grunt.option('outpath'));
        } else {
            grunt.log.writeln("Global '" + name + "' is now: " + val);
        }
    });

};
