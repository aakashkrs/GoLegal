// const gulp = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const clean = require('gulp-clean');
// const autoprefixer = require('gulp-autoprefixer');
// const sourcemaps = require('gulp-sourcemaps');
// const open = require('gulp-open');

// gulp.task('styles', function() {
//   return gulp.src('./src/assets/scss/*.scss') // Adjust path as needed
//     .pipe(sourcemaps.init())
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./src/assets/css')); // Adjust output path as needed
// });

// gulp.task('clean', function() {
//   return gulp.src('./src/assets/css', { read: false, allowEmpty: true })
//     .pipe(clean());
// });

// gulp.task('watch', function() {
//   gulp.watch('./src/assets/scss/*.scss', gulp.series('clean', 'styles'));
// });

// // gulp.task('open-app', function() {
// //   gulp.src('./public/index.html')
// //     .pipe(open({ uri: 'http://localhost:3000' }));
// // });

// gulp.task('open-app', function(done) {
//   gulp.src('./public/index.html')
//     .pipe(open({ uri: 'http://localhost:3000' }));
//   done(); // Signal async completion
// });


// gulp.task('default', gulp.series('clean', 'styles', 'watch'));


var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');

var Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/material-dashboard.scss',
  SCSS: './assets/scss/**/**'
};

gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task('watch', function() {
  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
});

gulp.task('open', function(done) {
  gulp.src('./public/index.html')
  .pipe(open({ uri: 'http://localhost:3000' }));
  done();
});

gulp.task('open-app', gulp.parallel('open', 'watch'));