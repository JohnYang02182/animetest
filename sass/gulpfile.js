// gulpfile.js
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');
var sassLint = require('gulp-sass-lint');

// notify
function showErrorNotify(error) {
  var args = Array.prototype.slice.call(arguments);
  // Show notification
  notify.logLevel(0);
  notify
    .onError({
      title: '[' + error.relativePath + '] Error',
      message: '<%= error.messageOriginal %>',
      sound: 'Pop'
    })
    .apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

// sass task
gulp.task('sass', function() {
  return gulp
    .src('src/**/*.+(scss|sass)')
    .pipe(
      plumber({
        errorHandler: showErrorNotify
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('../css'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

// 新增 browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '../' // html 根目錄
    }
    // more options: https://www.browsersync.io/docs/options/
  });
});

// sass lint task
gulp.task('sassLint', function() {
  return gulp
    .src('src/**/*.s+(a|c)ss')
    .pipe(
      plumber({
        errorHandler: showErrorNotify
      })
    )
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

// gulp watch
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('src/**/*.+(scss|sass)', ['sassLint']);
  gulp.watch('src/**/*.+(scss|sass)', ['sass']);
  gulp.watch('../**/*.html', browserSync.reload); // 觀察 html 變化
  gulp.watch('../**/*.js', browserSync.reload); // 觀察 js 變化
});
