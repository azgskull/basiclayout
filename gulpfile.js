var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');

var rename = require('gulp-rename');
var runSequence = require('run-sequence');


var paths = {
  sass: ['app/sass/*.scss','!src/sass/_require.scss'],
  jade: 'app/jade/views/**/*.jade',
  css : 'output/assets/css/*.css', //only first level
  js : 'output/assets/js/*.js', //only first level
};

//SASS TASK
gulp.task('sass', function(){
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('output/assets/css'))
});

//Jade TASK
gulp.task('jade', function(){
  return gulp.src(paths.jade)
    .pipe(jade({
      pretty : true, //pretty is Good
    }))
    .pipe(gulp.dest('output/'))
});


//Minify CSS
gulp.task('minify-css', function() {
  return gulp.src(paths.css)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('output/assets/css/'));
});

//Uglify JS
gulp.task('uglify-js', function() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('output/assets/js/'));
});

//Copying
gulp.task('src-build', function() {
  return gulp.src('app/src/**/*')
    .pipe(gulp.dest('output/'));
});


//Build projects
gulp.task('build', function(callback){
    runSequence('src-build',['jade','sass'],['minify-css','uglify-js'], callback)
});


//Watching tasks
gulp.task('watch', function(){
  gulp.watch('app/sass/**/*.scss', ['sass']); //watch all Sass 
  gulp.watch('app/jade/**/*.jade', ['jade']); //watch all Jade 
  gulp.watch('app/src/**/*', ['src-build','minify-css','uglify-js']); //watch all modifs in src 
})