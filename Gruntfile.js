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
					advanced: false,
					keepSpecialComments: '*',
					compatibility: 'ie8',
				}
			}
		},
		// SCSSのコンパイル
		sass: {
			options: {
				sourcemap: 'none',
				unixNewlines: true,
				style: 'expanded',
				loadPath: ['bower_components/bootstrap-sass-official/assets/stylesheets/']
			},
			bootstrap: {
				files: [{
					expand: true,
					cwd: 'scss',
					src: ['**/*.scss'],
					dest: 'dist/css/',
					ext: '.css'
				}]
			},
			assets: {
				options: {
					loadPath: ['scss/']
				},
				files: [{
					expand: true,
					cwd: 'src/scss',
					src: ['**/*.scss'],
					dest: 'dist/assets/css/',
					ext: '.css'
				}]
			}
		},
		csscomb: {
			options: {
				config: 'bower_components/bootstrap/less/.csscomb.json'
			},
			bootstrap: {
				files: {
					'dist/css/bootstrap.css': ['dist/css/bootstrap.css']
				}
			},
			assets: {
				expand: true,
				cwd: 'dist/assets/css/',
				src: ['**/*.css'],
				dest: 'dist/assets/css',
				ext: '.css'
			}
		},
		autoprefixer: {
			bootstrap: {
				files: {
					'dist/css/bootstrap.css': ['dist/css/bootstrap.css']
				}
			},
			assets: {
				expand: true,
				cwd: 'dist/assets/css/',
				src: ['**/*.css'],
				dest: 'dist/assets/css',
				ext: '.css'
			}
		},
		// clean
		clean: {
			build: {
				src: ['dist/css/**/*', 'dist/js/**/*', 'dist/fonts/**/*']
			}
		},
		// bowerのインストール
		bower: {
			install: {
				options: {
					targetDir: 'dist/',
					layout: function(type, component, source) {
						return type;
					}
				}
			}
		},
		// バージョン情報の出力
		ect: {
			version: {
				options: {
					root: 'scss/honoka/',
					variables: {
						name: pkg.name,
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
			// 自動コンパイル
			bootstrap: {
				files: ['scss/**/*.scss'],
				tasks: ['sass:bootstrap'],
			},
			// 自動コンパイル
			assets: {
				files: ['src/scss/**/*.scss'],
				tasks: ['sass:assets'],
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

	// 本家Bootstrapのautoprefixerの設定を読み込む
	grunt.task.registerTask('setAutoPrefixerConfig', 'Get autoprefixer config from bootstrap', function() {
		var fs = require('fs');
		if ( fs.existsSync('bower_components/bootstrap/grunt/configBridge.json') ) {
			var configBridge = grunt.file.readJSON('bower_components/bootstrap/grunt/configBridge.json');
			var prefixConfig = configBridge.config.autoprefixerBrowsers;
			grunt.config.merge({
				autoprefixer: {
					options: {
						browsers: prefixConfig
					}
				}
			});
		}
	});

	// 通常 (sass/connect/watch)
	grunt.registerTask('server', ['bower:install', 'ect:version', 'sass', 'connect', 'watch']);

	// ミニファイ
	grunt.registerTask('build', ['clean:build', 'bower:install', 'ect:version', 'sass', 'setAutoPrefixerConfig', 'autoprefixer', 'csscomb', 'cssmin:minify', 'replace:banner']);

	// 配布用パッケージ作成
	grunt.registerTask('package', ['build', 'compress:main']);

	grunt.registerTask('eatwarnings', function() {
		grunt.warn = grunt.fail.warn = function(warning) {
			grunt.log.error(warning);
		};
	});

};
