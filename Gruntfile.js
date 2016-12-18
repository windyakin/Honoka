'use strict';

module.exports = function(grunt) {

	var pkg, bower, taskName, name;

	pkg = grunt.file.readJSON('package.json');
	bower = grunt.file.readJSON('bower.json');
	name = pkg.name.toLowerCase();

	grunt.initConfig({
		pkg: pkg,
		bowerJSON: bower,
		banner:	'/*!\n' +
						' * <%= pkg.name %> v<%= pkg.version %>\n' +
						' * Website <%= pkg.website %>\n' +
						' * Copyright 2015 <%= pkg.author %>\n' +
						' * The <%= pkg.license %> License\n' +
						(
							pkg.name !== "Honoka" ?
								' * Based on Honoka (http://honokak.osaka/) by windyakin\n'
							:
								''
						) +
						' */\n' +
						'/*!\n' +
						' * Bootstrap v<%= twbs.version %> (<%= twbs.homepage %>)\n' +
						' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= twbs.author %>\n' +
						' * Licensed under the <%= twbs.license %> (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n' +
						' */\n',
		// bannerの調整
		replace: {
			// バナーの追加
			banner: {
				src: ['dist/css/bootstrap**.css'],
				dest: 'dist/css/',
				replacements: [
					{
						from: '@charset \'UTF-8\';',
						to: '@charset \'UTF-8\';\n<%= banner %>'
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
				bundleExec: true,
				loadPath: ['bower_components/']
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
					loadPath: ['scss/', 'bower_components/']
				},
				files: [{
					expand: true,
					cwd: 'docs/assets/scss',
					src: ['**/*.scss'],
					dest: 'docs/assets/css/',
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
				cwd: 'docs/assets/css/',
				src: ['**/*.css'],
				dest: 'docs/assets/css',
				ext: '.css'
			}
		},
		// SCSSのLinter
		scsslint: {
			options: {
				bundleExec: true,
				config: '.scss-lint.yml',
				reporterOutput: null,
				colorizeOutput: true
			},
			bootstrap: ['scss/**/*.scss'],
			assets: ['docs/assets/scss/**/*.scss']
		},
		// clean
		clean: {
			build: {
				src: ['bower_components/**/*', 'dist/css/**/*', 'dist/js/**/*', 'dist/fonts/**/*']
			}
		},
		// bowerのインストール
		bower: {
			install: {}
		},
		// ファイル更新監視
		watch: {
			// 自動コンパイル
			bootstrap: {
				files: ['scss/**/*.scss', 'docs/assets/scss/**/*.scss'],
				tasks: ['scsslint', 'css', 'csscomb', 'copy:docs']
			}
		},
		copy: {
			bower: {
				expand: true,
				cwd: 'bower_components/bootstrap/dist/',
				src: ['js/bootstrap**.js'],
				dest: 'dist/'
			},
			docs: {
				expand: true,
				cwd: 'dist/',
				src: ['{css,fonts,js}/**/*'],
				dest: 'docs/'
			}
		},
		// テストサーバ
		connect: {
			server: {
				options: {
					port: 8000,
					hostname: '*',
					base: 'docs'
				}
			}
		},
		// exec
		exec: {
			postcss: {
				command: 'npm run postcss'
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
						// JavaScript
						expand: true,
						cwd: "dist/js/",
						src: ["bootstrap.**js"],
						dest: name +"/js"
					},
					{
						// Sample
						expand: true,
						cwd: "docs/",
						src: ["bootstrap.html"],
						dest: name
					},
					{
						// README
						src: ["README.md", "LICENSE"],
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
	grunt.task.registerTask('getTwbsConfig', 'Get config from bootstrap', function() {
		try {
			var twbsPkg = grunt.file.readJSON('bower_components/bootstrap/package.json');
			grunt.verbose.ok();
		} catch (e) {
			grunt.verbose.or.write("Loading Bootstrap config...").error().error(e.message);
			grunt.fail.fatal('Do you install bower component? Try "grunt bower:install"');
		}
		grunt.config.merge({
			twbs: twbsPkg,
		});
	});

	// テスト
	grunt.registerTask('test', ['scsslint']);

	// CSSビルド
	grunt.registerTask('css', ['sass', 'exec:postcss', 'csscomb']);

	// 最適化
	grunt.registerTask('optimize', ['cssmin:minify']);

	// 開発用
	grunt.registerTask('server', ['bower:install', 'test', 'css', 'copy:docs', 'connect', 'watch']);

	// ビルドタスク
	grunt.registerTask('build', ['clean:build', 'bower:install', 'copy:bower', 'getTwbsConfig', 'test', 'css', 'optimize', 'replace:banner', 'copy:docs']);

	// 配布用パッケージ作成
	grunt.registerTask('package', ['build', 'compress:main']);

	grunt.registerTask('eatwarnings', function() {
		grunt.warn = grunt.fail.warn = function(warning) {
			grunt.log.error(warning);
		};
	});

};
