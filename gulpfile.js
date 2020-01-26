const gulp = require('gulp')
const sass = require('gulp-sass')
const debug = require('gulp-debug')
const sourceMaps = require('gulp-sourcemaps')
const gulpIf = require('gulp-if')
const clean = require('gulp-clean')
const newer = require('gulp-newer')
const notify = require('gulp-notify')
const gulpResolveUrl = require('gulp-resolve-url')
const cssMin = require('gulp-cssmin')
const imagemin = require('gulp-imagemin')
const imgCompress  = require('imagemin-jpeg-recompress')
const browserSync = require('browser-sync').create()
const pug = require('gulp-pug')
const htmlmin = require('gulp-htmlmin')
const autoPrefixer = require('gulp-autoprefixer')
const gulpSequence = require('gulp-sequence')
const webpack = require('webpack-stream')
const webPack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const rename = require('gulp-rename')
const cache = require('gulp-cached')
const isDebug = process.env.NODE_ENV === 'debug'

gulp.task('sass', function () {
  return gulp.src([
    './src/assets/scss/style.scss'
  ])
    .pipe(sourceMaps.init())
    .pipe(sass({
      includePaths: ['node_modules']
    })).on('error', notify.onError())
    .pipe(sourceMaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/assets/css/')).pipe(debug())
})

gulp.task('sass:compress', function () {
  return gulp.src([
    './src/assets/scss/style.scss'
  ])
    .pipe(sourceMaps.init())
    .pipe(sass({
      includePaths: ['node_modules']
    })).on('error', notify.onError())
    .pipe(autoPrefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulpResolveUrl())
    .pipe(cssMin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/assets/css/'))
    .pipe(debug())
})


// Optimize images
gulp.task('img:compress', function() {
  return gulp.src('src/assets/img/**/*')
      .pipe(imagemin([
        imgCompress({
          loops: 4,
          min: 70,
          max: 80,
          quality: 'high'
        }),
        imagemin.gifsicle(),
        imagemin.optipng(),
        imagemin.svgo()
      ]))
      .pipe(gulp.dest('public/assets/img/'));
});


gulp.task('clean', function () {
  return gulp.src('./public')
    .pipe(clean())
    .pipe(debug())
})

gulp.task('js', function () {
  return gulp.src('./src/assets/js/index.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      plugins: [
        new webPack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        })
      ],
    })).on('error', notify.onError())
    .pipe(gulp.dest('./public/assets/js/'))
    .pipe(debug())
})

gulp.task('js:compress', function () {
  return gulp.src('./src/assets/js/index.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      plugins: [
        new webPack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery'
        }),
        new UglifyJsPlugin()
      ],
    })).on('error', notify.onError())
    .pipe(gulp.dest('./public/assets/js/'))
    .pipe(debug())
})

gulp.task('fonts', function () {
  return gulp.src('./src/assets/fonts/**/*.*')
    .pipe(newer('./public/assets/fonts/'))
    .pipe(gulp.dest('./public/assets/fonts/'))
    .pipe(debug())
})

gulp.task('img', function () {
  return gulp.src([
    'src/assets/img/**/*.*',
  ])
    .pipe(newer('./public/assets/img/'))
    .pipe(gulp.dest('public/assets/img/'))
    .pipe(debug())
})

gulp.task('docs', function () {
  return gulp.src([
    'src/assets/docs/**/*.*'
  ])
      .pipe(newer('./public/docs/'))
      .pipe(gulp.dest('public/docs/'))
      .pipe(debug())
})

gulp.task('files', function () {
  return gulp.src([
    'src/*.*', 'src/.htaccess'
  ])
      .pipe(newer('./public/'))
      .pipe(gulp.dest('public/'))
      .pipe(debug())
})

gulp.task('pug', function () {
  return gulp.src('./src/pages/**/*.pug')
    .pipe(pug(
      {pretty: true}
    ))
    .pipe(cache('pug'))
    .pipe(gulp.dest('public/'))
    .pipe(debug())
})

gulp.task('pug:compressor', function () {
  return gulp.src('./src/pages/**/*.pug')
    .pipe(pug(
      {pretty: true}
    ))
    .pipe(cache('pug'))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public/'))
    .pipe(debug())
})

gulp.task('build:dev', gulpSequence(
  ['clean'],
  ['sass', 'img', 'fonts', 'js', 'pug', 'docs', 'files']
))

gulp.task('server', function () {
  browserSync.init({
    server: 'public'
  })
  browserSync.watch('./public/**/*').on('change', browserSync.reload)
})

gulp.task('watch', function () {
  gulp.watch('./src/assets/scss/**/*.scss', ['sass'])
  gulp.watch('./src/assets/img/**/*', ['img'])
  gulp.watch('./src/assets/img/**/*', ['img:compress'])
  gulp.watch('./src/**/*.pug', ['pug'])
  gulp.watch('./src/assets/js/**/*.js', ['js'])
  gulp.watch('./src/assets/docs/**/*', ['docs'])
  gulp.watch('./src/*.*', ['files'])
})

gulp.task('dev', gulpSequence('build:dev', ['watch', 'server']))

gulp.task('build', gulpSequence(
  ['clean'],
  ['sass:compress', 'img:compress', 'fonts', 'js:compress', 'pug:compressor', 'docs', 'files']
))
