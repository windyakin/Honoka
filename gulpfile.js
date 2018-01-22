const Gulp = require('gulp');
const Plugins = require('gulp-load-plugins')();
const Del = require('del');

Gulp.task('default', () => {
  console.log("Hello, world!");
});

Gulp.task('lint:css', () => {
  return Gulp.src(['scss/**/*.scss'])
    .pipe(Plugins.stylelint({
      failAfterError: true,
      reporters: [
        {formatter: 'verbose', console: true}
      ]
    }));
});

Gulp.task('build:css', () => {
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

Gulp.task('minify:css', () => {
  return Gulp.src(['dist/css/*.css', '!dist/css/*.min.css'])
    .pipe(Plugins.cleanCss({
      level: 1,
    }))
    .pipe(Plugins.rename({
      extname: '.min.css'
    }))
    .pipe(Gulp.dest('dist/css'));
});
