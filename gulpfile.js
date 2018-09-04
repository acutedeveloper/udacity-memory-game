const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {

  browserSync.init({
        server: "./src/"
    });

  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/**.html').on('change', browserSync.reload);
  gulp.watch('./src/js/**.js').on('change', browserSync.reload);
});
