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
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build_release: {
                src: ['<%= src_files_js %>'],
                dest: '<%= dest_dir_rel %>js/so_tag.min.js'
            },
            build_dual: {
                src: ['<%= src_files_js %>'],
                dest: '<%= dest_dir_dual %>js/so_tag.min.js'
            }
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
            build_release: {
                options : {
                    report: 'gzip'
                },
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= dest_dir_rel %>/css/',
                ext: '.min.css'
            },
            build_dual: {
                options : {
                    report: 'gzip'
                },
                expand: true,
                cwd: 'css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= dest_dir_dual %>/css/',
                ext: '.min.css'
            }
        },
        clean: {
            build_release: {
                src: ['<%= dest_dir_rel %>*']
            },
            build_dev: {
                src: ['<%= dest_dir_dev %>*']
            },
            build_dual: {
                src: ['<%= dest_dir_dual %>*']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task(s).
    grunt.registerTask('build_dev', ['clean:build_dev', 'copy:build_dev', 'jshint']);
    grunt.registerTask('build_release', ['clean:build_release', 'copy:build_release', 'jshint', 'uglify:build_release', 'cssmin:build_release']);
    grunt.registerTask('build_dual', ['clean:build_dual', 'copy:build_dual', 'jshint', 'uglify:build_dual', 'cssmin:build_dual']);
    grunt.registerTask('default', ['build_dev', 'build_release']);

};
