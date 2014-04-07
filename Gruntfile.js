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
  //Task Groups:
    grunt.registerTask('prebuild', ['set_option:outpath:', 'newer:csscomb:main']);
    grunt.registerTask('lint', ['set_option:outpath:', 'newer:jsonlint:main', 'newer:jshint:main']);
    grunt.registerTask('minify', ['newer:uglify:main', 'newer:cssmin:main']);
    grunt.registerTask('dev', ['set_option:outpath:build/dev/', 'newer:copy', 'set_option:archive:DEV', 'compress:main']);
    grunt.registerTask('release', ['set_option:outpath:build/release/', 'newer:copy:main', 'minify', 'set_option:archive:RELEASE', 'compress:main']);
    grunt.registerTask('build_dev', ['lint', 'prebuild',  'dev']);
    grunt.registerTask('build_release', ['lint', 'prebuild', 'release']);
    grunt.registerTask('build_dual', ['lint', 'prebuild',  'set_option:outpath:build/dual/', 'newer:copy', 'minify', 'set_option:archive:FULL', 'compress:main']);
    grunt.registerTask('default', ['lint', 'prebuild',  'dev', 'release']);
    //cleanup tasks:
    grunt.registerTask('clean_full', ['set_option:outpath:build/', 'clean']);
    grunt.registerTask('clean_dev', ['set_option:outpath:build/dev/', 'clean']);
    grunt.registerTask('clean_dual', ['set_option:outpath:build/dual/', 'clean']);
    grunt.registerTask('clean_release', ['set_option:outpath:build/release/', 'clean']);
};
