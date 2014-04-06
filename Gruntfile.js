module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        src_files_js: ['js/so_tag.js'],
        src_files_css: ['css/*.css'],
        src_files_other: ['*.json', '*.php', 'LICENSE', 'README.md', '!package.json'],
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
            main: {
                expand: true,
                cwd: '',
                src: '<%= src_files_other %>',
                dest: '<%= grunt.option("outpath") %>',
            },
            dev: {
                expand: true,
                cwd: '',
                src: [['<%= src_files_js %>'], ['<%= src_files_css %>']],
                dest: '<%= grunt.option("outpath") %>'
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
            main: {
                options: {
                    mode: 'zip',
                    archive: 'build/SOTag.<%= pkg.version %>.<%= grunt.option("archive") %>.zip'
                },
                cwd: '<%= grunt.option("outpath") %>',
                src: ['**/*'],
                dest: 'SOTag/',
                expand: true
            },
        },
        csscomb: {
            main: {
                expand: true,
                cwd: 'css/',
                src: ['*.css'],
                dest: 'css/'
            }
        },
        jsonlint: {
            main: {
                src: ['*.json']
            }
        },
        notify_hooks: {
            options: {
                enabled: true
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
