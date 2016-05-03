var merge = require('merge');

var gulp = require('gulp');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var less = require('gulp-less');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
//var coffee = require('gulp-coffee');
//var coffeelint = require('gulp-coffeelint');

var paths = {
    templatesSrc: ['./templates/**/*.htm', './templates/**/*.html'],
    templatesDest: './dist/',
    cssSrc: './css/**/*.css',
    lessSrc: './css/**/*.less',
    scssSrc: ['./css/**/*.sass', './css/**/*.scss'],
    cssDest: './dist/css/',
    tsSrc: ['./src/**/*.ts', './src/**/*.tsx'],
    tsDef: "./typings/internal/",
    tsDest: './dist/app/'
};

var tsProj = ts.createProject('tsconfig.json');

gulp.task('clean', function () {
    gulp.src(['./dist/css/', './dist/app/'], { read: false })
        .pipe(clean());
});

gulp.task('templates', function () {
    gulp.src(paths.templatesSrc)
        .pipe(gulp.dest(paths.templatesDest));
});

gulp.task('css', function () {
    gulp.src(paths.lessSrc)
        .pipe(less())
        .pipe(gulp.dest(paths.cssDest));

    gulp.src(paths.scssSrc)
        .pipe(sass())
        .pipe(gulp.dest(paths.cssDest));

    gulp.src(paths.cssSrc)
        .pipe(gulp.dest(paths.cssDest));
});

gulp.task('ts', function () {
    var tsRes = gulp.src(paths.tsSrc)
        .pipe(ts(tsProj));

    return merge([
        tsRes.dts.pipe(gulp.dest(paths.tsDef)),
        tsRes.js.pipe(gulp.dest(paths.tsDest))
    ]);
});

// gulp.task('coffeelint', function () {
//     gulp.src('*.coffee')
//         .pipe(coffeelint())
//         .pipe(coffeelint.reporter());
// });

// gulp.task('coffee', function () {
//     gulp.src('*.coffee')
//         .pipe(coffee({bare: true}).on('error', gutil.log))
//         .pipe(gulp.dest(function (f) {
//             return f.base;
//         }))
// });

gulp.task('default', ['clean', 'templates', 'css', 'ts'], function () {
    //gulp.watch(paths.templatesSrc, ['templates']);

    //gulp.watch(paths.lessSrc, ['css']);
    //gulp.watch(paths.sassSrc, ['css']);

    //gulp.watch(paths.tsSrc, ['ts']);
});

// gulp.task('default', ['coffee'], function () {
//     gulp.watch('*.coffee', ['coffee']);
// });