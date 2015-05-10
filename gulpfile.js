var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('default', ['clean', 'less']);

gulp.task('angular-template', function () {
    return gulp.src('public/app/**/*.html')
        .pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('public/assets/compiled/temp'));
});

gulp.task('less', function() {
    return gulp.src('public/assets/less/*.less')
        .pipe(concat('design.less'))
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('public/assets/compiled'));
});

gulp.task('copy', function () {
    return gulp.src('bower_components/angular/angular.js')
        .pipe(gulp.dest('public/assets/compiled/temp'));
});

gulp.task('concat', ['angular-template', 'copy'], function () {
    return gulp.src(['public/assets/compiled/temp/*.js', 'public/app/**/*.js'])
        .pipe(concat('script.js'))
        .pipe(gulp.dest('public/assets/compiled'));
});

gulp.task('minify', ['concat'], function () {
    return gulp.src('public/assets/compiled/script.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('public/assets/compiled'));
});

gulp.task('clean', ['concat'], function () {
    return gulp.src('public/assets/compiled/temp', {read: false})
        .pipe(clean())
        .on('error', function(err){
            console.error(err.message);
        });
});

gulp.task('watch', function () {
    gulp.watch('public/app/**/*', ['clean']);
    gulp.watch('public/assets/less/*', ['less']);
});