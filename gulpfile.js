var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', ['clean']);

gulp.task('angular-template', function () {
    return gulp.src('public/app/**/*.html')
        .pipe(templateCache())
        .pipe(gulp.dest('public/assets/compiled/temp'));
});

gulp.task('concat', ['angular-template'], function () {
    return gulp.src('public/assets/compiled/temp/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('public/assets/compiled'));
});

gulp.task('minify', ['concat'], function () {
    return gulp.src('public/assets/compiled/script.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('public/assets/compiled'));
});

gulp.task('clean', ['minify'], function () {
    return gulp.src('public/assets/compiled/temp', {read: false})
        .pipe(clean())
        .on('error', function(err){
            console.error(err.message);
        });
});