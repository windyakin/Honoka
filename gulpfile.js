const Gulp = require('gulp');
const Plugins = require('gulp-load-plugins')();
const Fs = require('fs');
const Del = require('del');
const RunSequence = require('run-sequence');

const PackageJSON = JSON.parse(Fs.readFileSync('./package.json'));

const BANNER = `/*!
 * ${PackageJSON.config.packageName} v${PackageJSON.version} (${PackageJSON.website})
 * Copyright ${PackageJSON.config.projectStartYear} ${PackageJSON.author}
 * Licensed under ${PackageJSON.license} (${PackageJSON.config.licenseUrl})
 */`;

Gulp.task('default', () => {
  console.log("Hello, world!");
});

Gulp.task('css:clean', () => {
  return Del(['dist/css/**/*']);
});

Gulp.task('css:lint', () => {
  return Gulp.src(['scss/**/*.scss'])
    .pipe(Plugins.stylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'verbose', console: true}
      ]
    }));
});

Gulp.task('css:build', () => {
  return Gulp.src(['scss/**/*.scss'])
    .pipe(Plugins.plumber({
      errorHandler: function(err) {
        console.error(err.message);
        this.emit('end');
      }
    }))
    .pipe(Plugins.sass({
      includePaths: [
        'node_modules/'
      ],
      outputStyle: 'expanded',
      sourceMap: true,
      sourceMapContents: true,
      lineFeed: 'lf',
      precision: 6
    }))
    .pipe(Plugins.plumber.stop())
    .pipe(Plugins.postcss({
      noMap: true,
      use: 'autoprefixer',
      config: '../build/postcss.config.js',
      replace: 'dist/css/bootstrap.css'
    }))
    .pipe(Gulp.dest('dist/css'));
});

Gulp.task('css:banner', () => {
  return Gulp.src(['dist/css/*.css'])
    .pipe(Plugins.replace('/*!', `@charset "UTF-8";\n${BANNER}\n/*!`))
    .pipe(Gulp.dest('dist/css'));
});

Gulp.task('css:minify', () => {
  return Gulp.src(['dist/css/*.css', '!dist/css/*.min.css'])
    .pipe(Plugins.cleanCss({
      level: 1,
    }))
    .pipe(Plugins.rename({
      extname: '.min.css'
    }))
    .pipe(Gulp.dest('dist/css'));
});

Gulp.task('clean', (resolve) => {
  RunSequence(['css:clean'], () => resolve());
});

Gulp.task('css', (resolve) => {
  RunSequence('clean', 'css:build', 'css:minify', 'css:banner', () => resolve());
});
