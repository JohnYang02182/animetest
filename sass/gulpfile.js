'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var sassLint = require('gulp-sass-lint');
 
sass.compiler = require('node-sass');

gulp.task('sass', function () {
  return gulp.src('src/**/*.+(scss|sass)')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('../css/'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.+(scss|sass)',gulp.series('sass'));
});

//新增 browserSync task
// gulp.task('browserSync', function() {
//   browserSync.init({
//     server: {
//       baseDir: '../' // html 根目錄
//     }
//     // more options: https://www.browsersync.io/docs/options/
//   });
// });
 
gulp.task('sassLint', function () {
  return gulp.src('src/**/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('default', gulp.series('sass', 'watch' ,'sassLint'));
// gulp.task('watch', gulp.parallel('browserSync', 'sass'), function() {
//   gulp.watch('src/**/*.+(scss|sass)', gulp.series('sassLint'));
//   gulp.watch('src/**/*.+(scss|sass)', gulp.series('sass'));
//   gulp.watch('src/**/*.+(scss|sass)', gulp.series('browserSync'));
//   gulp.watch('../**/*.html', browserSync.reload); // 觀察 html 變化
//   gulp.watch('../**/*.js', browserSync.reload); // 觀察 js 變化
// });

