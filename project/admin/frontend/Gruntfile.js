module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            dist:{
                files: {
                    "dist/css/style.css": "dist/less/controller.less"
                }
            }
        },
        concat: {
            options: {
                separator: ''
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
        },
        watch: {
            less: {
                files: [
                    'dist/less/custom-bootstrap/*.less',
                    'dist/less/*.less'
                ],
                tasks: ['less', 'concat', 'cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('built', ['less', 'concat', 'ngmin', 'cssmin']);

};