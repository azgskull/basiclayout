var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');


var paths = {
  sass: ['src/sass/*.scss','!src/sass/_require.scss'],
  jade: 'src/jade/views/**/*.jade'
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



//Watching tasks
gulp.task('watch', function(){
  gulp.watch('src/sass/**/*.scss', ['sass']); //watch all Sass 
  gulp.watch('src/jade/**/*.jade', ['jade']); //watch all Jade 
})