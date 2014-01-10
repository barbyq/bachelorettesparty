module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: ['views/*.html'],
			},
			js: {
				files: ['public/javascript/*.js']
			},
			css: {
				files: ['public/stylesheets/*.scss'],
				tasks: ['sass']
			}
		},
		sass: {
			dist: {
				files: {
					'public/stylesheets/styles.css': 'public/stylesheets/styles.scss'
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', ['sass']);

};