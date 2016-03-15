
var gulp = require('gulp');
browserify = require('browserify'),
source = require('vinyl-source-stream'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
del = require('del'),
jshint = require('gulp-jshint'),
postcss = require('gulp-postcss'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('autoprefixer'),
lost = require('lost'),
browserSync = require('browser-sync').create();

gulp.task('jshint', function(){
  return gulp.src(['js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
    .pipe(concat('allConcat.js'))
    .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'] , function() {
  return browserify({ entries: ['./tmp/allConcat.js'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task("minifyScripts", ["jsBrowserify"], function(){
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});


gulp.task("clean", ["minifyScripts"], function(){
  console.log('done');
  browserSync.reload();
  return del(['tmp']);
});

gulp.task('styles', function () {
  var processors = [ autoprefixer, lost
  ];
  browserSync.reload();
  return gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });

  gulp.task('html', function(){
    browserSync.reload();
  });

  console.log("Watching js and scss files for modifications");
  gulp.watch('js/*.js', ["clean"]);
  gulp.watch('scss/*.scss', ["styles"]);
  gulp.watch('index.html', ["html"]);
});

gulp.task('default', ['serve']);
