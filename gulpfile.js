"use strict";

var gulp = require("gulp");
var bulkSass = require('gulp-sass-bulk-import');
var plumber = require("gulp-plumber");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var terser = require('gulp-terser');
var historyApiFallback = require('connect-history-api-fallback');

gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(bulkSass())
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    files: "dist/",
    server: "dist/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
    server: {
      baseDir: "dist",
      middleware: [ historyApiFallback() ]
    }
  });

  gulp.watch("src/scripts/**/*.{ts,js}", gulp.series("js"));
  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("css"));
  // gulp.watch("src/img/**/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("src/*.html", gulp.series("html", "refresh"))
});


gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"))
})

gulp.task("refresh", function (done) {
  server.reload();
  done();
})

gulp.task("js", function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['src/scripts/app.ts'],
    cache: {},
    packageCache: {}
  })
  .plugin(tsify)
  .transform('babelify', {
    presets: ['es2015'],
    extensions: ['.ts']
  })
  .bundle()
  .pipe(source('app.min.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(terser())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/js'));
})

gulp.task("clean", function () {
  return del("dist")
})

gulp.task("dist", gulp.series(
  "clean",
  "css",
  "js",
  "html"
))

gulp.task("start", gulp.series("dist", "server"));
