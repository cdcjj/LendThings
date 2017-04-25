module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        sourceMap: true,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: {
          'client/dist/<%= pkg.name %>.js': ['client/**/*.js'],
        }
      }
    },
    eslint: {
      target: ['client/**/*.js']
    },
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },
    watch: {
      scripts: {
        files: ['client/**/*.js',],
        tasks: ['babel']
      },
      css: {
        files: 'client/style.css',
        tasks: ['babel']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('server-dev', function(target) {
    grunt.task.run([ 'nodemon', 'watch']);
  });

};
