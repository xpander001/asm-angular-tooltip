var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var bowerFile = require('./bower.json');
var karma = require('karma').server;

var appConfig = {
  name: (bowerFile.name || require('./bower.json').appPath || 'asm-angular-tooltip'),
  version: bowerFile.version || '0.0.0',
};

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: ['./', 'example'],
      index: 'example/index.html',
    },
  });
});

gulp.task('watch', function () {
  gulp.watch([
    './example/*',
    './src/*',
  ], browserSync.reload);
});

gulp.task('build-js', function () {
  return gulp.src(['src/module.js', 'src/directive.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(ngAnnotate())
    .pipe(concat(appConfig.name + '.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(concat(appConfig.name + '.min.js'))
    .pipe(gulp.dest('dist'));
});

var uglifycss = require('gulp-uglifycss');

gulp.task('build-css', function () {
  gulp.src('src/styles.css')
    .pipe(uglifycss({
      uglyComments: true,
    }))
    .pipe(concat(appConfig.name + '.css'))
    .pipe(gulp.dest('dist'));
});

gulp.task('develop', function () {
  gulp.run('browser-sync', 'watch');
});

gulp.task('test', function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
    done();
  });
});

gulp.task('build', function () {
  gulp.run(['build-js', 'build-css']);
});
