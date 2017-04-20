var gulp = require('gulp');
var config = {
  src: {
    html: 'src/**/*.html',
    js: 'src/**/*.js',
    css: 'src/**/*.css',
  }
}

gulp.task('html', function () {
  return gulp
    .src(config.src.html)
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
  return gulp
    .src(config.src.js)
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  return gulp
    .src(config.src.css)
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function(){
  gulp.watch(config.src.html, ['html']);
  gulp.watch(config.src.js, ['js']);
  gulp.watch(config.src.css, ['css']);
});

gulp.task('dev', ['html', 'js', 'css', 'watch']);
gulp.task('default', ['dev']);


