module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/so_tag.js',
                dest: 'build/js/so_tag.min.js'
            }
        },
        jshint: {
            src: ['js/so_tag.js']
        },
        copy: {
            main: {
                src: ['css/*', 'js/so_tag.js', '*.json', '*.php', 'LICENSE', 'README.md'],
                dest: 'build/',
            },
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'build/css/',
                ext: '.min.css'
            }
        },
        clean: {
            build: {
                src: ["build/"]
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
    grunt.registerTask('default', ['clean', 'copy', 'jshint', 'uglify', 'cssmin']);

};
