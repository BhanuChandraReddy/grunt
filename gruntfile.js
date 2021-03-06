module.exports = function(grunt) {
    const sass = require('node-sass');    
    // Configure our tasks and tells plugins where to find certain files
    grunt.initConfig({
        concat: {
            js: {
                src: ['static/js/jquery-3.4.1.js', 'static/js/pages/*.js'],
                dest: 'build/app.js'
            },
            css: {
                src: ['static/css/bootstrap.css','static/css/styles.css'],
                dest: 'build/styles.css'
            }
        },
        sass: {
            options: {
                implementation: sass
            },
            build: {
                files: [{
                    src: 'scss/main.scss',
                    dest: 'static/css/styles.css'
                }]
            }
        },
        cssmin: {
            build: {
                files: [{
                    src: 'build/styles.css',
                    dest: 'build/styles.min.css'
                }]
            }
        },
        uglify: { // js minification
            build: {
                options: {
                    beautify: true
                },
                files: [{
                    src: 'build/app.js',
                    dest: 'build/app.min.js'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['static/js/*.js'],
                tasks: ['js']
            },
            styles: {
                files: ['scss/*.scss'],
                tasks: ['css']
            }
        },
        eslint: {
            options: {
                configFile: 'eslint.json'
            },
            target: ['static/js/pages/*.js']
        },
        stylelint: {
            options: {
                configFile: '.stylelintrc.json',
                failOnError: true,
            },
            files: ['scss/*.scss']
        }
    });

    //load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-stylelint');

    grunt.registerTask('concat-js', ['concat:js']);
    grunt.registerTask('concat-css', ['concat:css']);
    grunt.registerTask('css-min', ['cssmin:build']);

    //grunt.registerTask('sass-build', ['sass:build']);

    grunt.registerTask('css', ['stylelint', 'sass', 'concat-css', 'css-min']);
    grunt.registerTask('js', ['eslint', 'concat-js', 'uglify']);

    grunt.registerTask('default', ['css','js','watch']);

}