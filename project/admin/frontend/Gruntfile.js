module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ''
            },
            js: {
                src: [
                    'vendor/angular/angular.js',
                    'vendor/angular-i18n/angular-locale_ru.js',
                    'vendor/angular-route/angular-route.js',
                    'vendor/angular-sanitize/angular-sanitize.js',
                    'vendor/angular-animate/angular-animate.js',
                    'vendor/angular-strap/dist/angular-strap.js',
                    'vendor/angular-strap/dist/angular-strap.tpl.js',
                    'vendor/angular-bootstrap/ui-bootstrap.min.js',
                    'src/app.js'
                ],
                dest: 'dist/js/built.js'
            },
            css: {
                src: [
                    'vendor/angular/angular-csp.css',
                    'vendor/angular-motion/dist/angular-motion.min.css',
                    'dist/css/style.css'
                ],
                dest: 'dist/css/built.css'
            }
        },
        ngmin : {
            build: {
                src: 'dist/js/built.js',
                dest: 'dist/js/built.min.js'
            }
        },
        cssmin: {
            combine: {
                src: 'dist/css/built.css',
                dest: 'dist/css/built.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('built', [ 'concat', 'ngmin', 'cssmin']);

};