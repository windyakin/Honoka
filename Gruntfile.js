'use strict';

module.exports = function(grunt) {
	var pkg, taskName, ect_var;
	pkg = grunt.file.readJSON('package.json');
	grunt.initConfig({
		// bannerの調整
		replace: {
			banner: {
				src: ['dist/bootstrap.min.css'],
				dest: 'dist/bootstrap.min.css',
				replacements: [{
					from: '@charset "UTF-8";/*!',
					to: '@charset "UTF-8";\n/*!',
				},
				{
					from: 'Based on Bootstrap\n */',
					to: 'Based on Bootstrap\n */\n'	
				}]
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
				tasks: ['compass:dist'],
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
	grunt.registerTask('server', ['compass:dist', 'connect', 'watch']);

	// ミニファイ
	grunt.registerTask('build', ['clean:build', 'compass:dist', 'cssmin:minify', 'replace:banner']);
	
	grunt.registerTask('eatwarnings', function() {
		grunt.warn = grunt.fail.warn = function(warning) {
			grunt.log.error(warning);
		};
	});

};
