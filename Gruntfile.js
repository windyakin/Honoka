'use strict';

module.exports = function(grunt) {
	var pkg, taskName, ect_var;
	pkg = grunt.file.readJSON('package.json');
	grunt.initConfig({
		// compassのコンパイル
		compass: {
			dist: {
				options: {
					sassDir: 'src/compass',
					config: 'src/config.rb'
				}
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
	grunt.registerTask('default', ['compass:dist', 'connect', 'watch']);
	
	grunt.registerTask('eatwarnings', function() {
		grunt.warn = grunt.fail.warn = function(warning) {
			grunt.log.error(warning);
		};
	});

};
