'use strict';

 // Подключаемые библиотеки
var gulp          = require('gulp');
var sass          = require('gulp-sass');
var concat        = require('gulp-concat');
var cleanCSS      = require('gulp-clean-css');
var autoprefixer  = require('gulp-autoprefixer');
var sourceMaps    = require('gulp-sourcemaps');
var gulpif        = require('gulp-if');
var clean         = require('gulp-clean');

// Окружение
var ENV = process.env.NODE_ENV || 'production';

// Задача запускаемая по умолчанию
gulp.task('default', function() {
    var tasks = ['sass'];
    if (ENV != 'production') {
        tasks.push('watch');
    } else {
        gulp.src(['./src/*'], {read: false}).pipe(clean());
    }

    gulp.start(tasks);
});

// Задача для автозапуска нужных подзадач
gulp.task('watch', function () {
    ENV = 'dev';
    gulp.watch('sass/**/*.scss', ['sass']);
});

// Подзадача для запуска сборщика SCSS файлов
gulp.task('sass', function () {
    return gulp.src([
        './sass/index.scss'
    ])
        .pipe(gulpif(ENV != 'production', sourceMaps.init()))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 10 versions'], cascade: false}))
        .pipe(cleanCSS())
        .pipe(concat('./src/style.css'))
        .pipe(gulpif(ENV != 'production', sourceMaps.write()))
        .pipe(gulp.dest('.'));
});
