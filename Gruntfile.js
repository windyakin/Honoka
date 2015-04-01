'use strict';

module.exports = function(grunt) {
	var pkg, taskName, ect_var;
	pkg = grunt.file.readJSON('package.json');
	grunt.initConfig({
		pkg: pkg,
		// banner
		usebanner: {
			build: {
				options: {
					position: 'top',
					banner:	'/*!\n' +
									' * <%= pkg.name %> v<%= pkg.version %>\n' +
									' * Website: <%= pkg.website %>\n' +
									' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
									' * Licensed under <%= pkg.license %>\n' +
									' * Based on Bootstrap\n' +
									'*/',
				},
				files: {
					src: ['dist/bootstrap.css', 'dist/bootstrap.min.css']
				}
			},
			css: {
				options: {
					position: 'top',
					banner:	'/*!\n' +
									' * <%= pkg.name %> v<%= pkg.version %>\n' +
									' * Website: <%= pkg.website %>\n' +
									' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
									' * Licensed under <%= pkg.license %>\n' +
									' * Based on Bootstrap\n' +
									'*/',
				},
				files: {
					src: ['dist/bootstrap.css']
				}
			}
		},
		// cssmin
		cssmin: {
			minify: {
				expand: true,
				cwd: 'dist/',
				src: ['bootstrap.css'],
				dest: 'dist/',
				ext: '.min.css',
				options: {
					noAdvanced: true
				}
			}
		},
		// compassのコンパイル
		compass: {
			dist: {
				options: {
					sassDir: 'src/compass',
					config: 'src/config.rb'
				}
			}
		},
		clean: {
			build: {
				src: ['dist/bootstrap**.css']
			}
		},
		// ファイル更新監視
		watch: {
			// compassの自動コンパイル
			compass: {
				files: ['src/compass/**/*.scss'],
				tasks: ['compass:dist', 'usebanner:css'],
			}
		},
		// テストサーバ
		connect: {
			server: {
				options: {
					port: 8000,
					hostname: '*',
					base: 'dist'
				}
			}
		}
	});

	// GruntFile.jsに記載されているパッケージを自動読み込み
	for(taskName in pkg.devDependencies) {
		if(taskName.substring(0, 6) == 'grunt-') {
			grunt.loadNpmTasks(taskName);
		}
	}
	
	// 通常 (compass/connect/watch)
	grunt.registerTask('default', ['compass:dist', 'connect', 'watch']);

	// ミニファイ
	grunt.registerTask('build', ['clean:build','compass:dist', 'cssmin:minify', 'usebanner:build']);
	
	grunt.registerTask('eatwarnings', function() {
		grunt.warn = grunt.fail.warn = function(warning) {
			grunt.log.error(warning);
		};
	});

};
