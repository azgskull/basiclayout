var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

var paths = {
  sass: ['app/sass/*.scss','!src/sass/_require.scss'],
  jade: 'app/jade/views/**/*.jade'
};

//SASS TASK
gulp.task('sass', function(){
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('build/assets/css'))
});

//Jade TASK
gulp.task('jade', function(){
  return gulp.src(paths.jade)
    .pipe(jade({
      pretty : true, //pretty is Good
    }))
    .pipe(gulp.dest('build/'))
});


//Minify CSS
gulp.task('minify-css', function() {
  return gulp.src('build/assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/assets/css/'));
});

//Copying
gulp.task('src-build', function() {
  return gulp.src('app/src/**/*')
    .pipe(gulp.dest('build/'));
});

//Watching tasks
gulp.task('watch', function(){
  gulp.watch('app/sass/**/*.scss', ['sass']); //watch all Sass 
  gulp.watch('app/jade/**/*.jade', ['jade']); //watch all Jade 
  gulp.watch('app/src/**/*', ['src-build','minify-css']); //watch all modifs in src 
})