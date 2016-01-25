
// Grunt Configuration File
var globals= {
  port: 9000
};

module.exports = function( grunt ) {
  'use strict';

    // Load all grunt tasks
    require('jit-grunt')(grunt);

    grunt.initConfig({
        dist: 'public/',
        pkg: require('./package'),
        globals: globals,

        jshint: {
            options: {
                jshintrc: true
            },
            all: {
                src: ['Gruntfile.js', 'js/*.js']
            }
        },

        browserify: {
            deploy: {
                files: {
                    '<%= dist %>js/main.js': ['js/main.js']
                }
            }
        },

        pleeease: {

            // For development
            dev: {
                options: {
                    minifier: false,
                    sourcemaps: false,
                    rem: false,
                    opacity: false,
                    pseudoElements: false,
                    sass: true,
                    autoprefixer: {
                        browsers: ['last 2 versions']
                    },
                    next: {
                        colors: true
                    }
                },

                files: {
                    '<%= dist %>css/main.css': 'scss/main.scss'
                }
            },

            // For production
            dist: {
                options: {
                    sourcemaps: false,
                    rem: false,
                    opacity: false,
                    pseudoElements: false,
                    sass: true,
                    autoprefixer: {
                        browsers: ['last 2 versions']
                    }
                },

                files: {
                    '<%= dist %>css/main.css': 'scss/main.scss'
                }
            }
        },


        watch: {
            scss: {
                files: ['scss/*.scss'],
                tasks: ['pleeease:dev'],
                options: {
                    livereload: true,
                    atBegin: true
                }
            },
            js: {
                files: ['js/*.js'],
                tasks: ['jshint', 'browserify'],
                options: {
                    livereload: true,
                    atBegin: true
                }
            },
            images: {
                files: ['assets/images/**/*.{png,jpg,svg,gif}'],
                tasks: ['copy:images'],
                options: {
                    livereload: true,
                    atBegin: true
                }
            },
            icons: {
                files: ['assets/icons/**/*.svg'],
                tasks: ['svg_sprite'],
                options: {
                    livereload: true,
                    atBegin: true
                }
            },
            server: {
                files: ['.rebooted'],
            }
        },

        svg_sprite: {
            icons : {
                expand : true,
                cwd: 'assets/icons/',
                src: ['**/*.svg'],
                dest: '<%= dist %>/',
                options: {
                    mode: {
                        symbol: {
                            dest: ''
                        }
                    }
                }
            }
        },


        copy: {
            images: {
                files: [{
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: 'assets/images/',
                    dest: '<%= dist %>/images/',
                    src: ['**/*.{png,jpg,svg,gif}']
                }]
            }
        },

        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    env: {
                        PORT: '<%= globals.port %>',
                        NODE_ENV: 'development'
                    }
                }
            }
        },

        // Build Tasks
        // --------------------------
        uglify: {
            dist: {
                files: {
                    '<%= dist %>js/main.js': ['<%= dist %>js/main.js']
                }
            }
        }
    });

    // Development Tasks
    grunt.registerTask('dev', [
        'jshint',
        'browserify',
        'pleeease:dev',
        'svg_sprite',
        'copy:images',
        'copy:jquery'
    ]);

    // Local watch/livereload workflow
    grunt.registerTask('serve', [
        'concurrent'
    ]);

    // Deployment Tasks
    grunt.registerTask('build', [
        'browserify',
        'uglify',
        'pleeease:dist',
        'svg_sprite',
        'copy:images',
        'copy:jquery'
    ]);

    grunt.registerTask('default', ['dev']);
};
