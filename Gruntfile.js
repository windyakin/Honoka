'use strict';

module.exports = function(grunt) {
	var pkg, taskName, name;
	pkg = grunt.file.readJSON('package.json');
	name = pkg.name.toLowerCase();
	grunt.initConfig({
		// bannerの調整
		replace: {
			// minifyファイルの改行の追加
			banner: {
				src: ['dist/css/bootstrap.min.css'],
				dest: 'dist/css/bootstrap.min.css',
				replacements: [
					{
						from: '@charset "UTF-8";/*!',
						to: '@charset "UTF-8";\n/*!'
					},
					{
						from: /Based on Bootstrap v([\d\.]+)\n \*\//g,
						to: 'Based on Bootstrap v$1\n */\n'
					}
				]
			}
		},
		// cssmin
		cssmin: {
			minify: {
				expand: true,
				cwd: 'dist/css/',
				src: ['bootstrap.css'],
				dest: 'dist/css/',
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
				src: ['dist/css/**/*', 'dist/js/**/*', 'dist/fonts/**/*']
			}
		},
		copy: {
			build: {
				files: [
					{
						expand: true,
						cwd: 'src/bootstrap/assets/fonts/bootstrap/',
						src: ["**/*"],
						dest: 'dist/fonts'
					},
					{
						expand: true,
						cwd: "src/bootstrap/assets/javascripts/",
						src: ["bootstrap.**js"],
						dest: "dist/js"
					}
				]
			}
		},
		ect: {
			version: {
				options: {
					root: 'src/compass/css/honoka/',
					variables: {
						version: pkg.version,
						website: pkg.website,
						year: new Date().getFullYear(),
						author: pkg.author,
					},
				},
				files: {
					'<%= ect.version.options.root %>_info.scss': '_info.scss.ect'
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
		},
		compress: {
			main: {
				options: {
					archive: 'data/bootstrap-'+ name +'-'+ pkg.version +'-dist.zip'
				},
				files: [
					{
						//CSS
						expand: true,
						cwd: "dist/css/",
						src: ["bootstrap**.css"],
						dest: name +"/css"
					},
					{
						// Font
						expand: true,
						cwd: "dist/fonts/",
						src: ["**/*"],
						dest: name +"/fonts"
					},
					{
						// JavaScript
						expand: true,
						cwd: "dist/js/",
						src: ["bootstrap.**js"],
						dest: name +"/js"
					},
					{
						// Sample html
						expand: true,
						cwd: "dist/",
						src: ["bootstrap.html"],
						dest: name
					},
					{
						// README
						src: ["README.md"],
						dest: name
					}
				]
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
	grunt.registerTask('server', ['ect:version', 'compass:dist', 'connect', 'watch']);

	// ミニファイ
	grunt.registerTask('build', ['clean:build', 'copy:build', 'ect:version', 'compass:dist', 'cssmin:minify', 'replace:banner']);

	// 配布用パッケージ作成
	grunt.registerTask('package', ['build', 'compress:main']);

	grunt.registerTask('eatwarnings', function() {
		grunt.warn = grunt.fail.warn = function(warning) {
			grunt.log.error(warning);
		};
	});

};
