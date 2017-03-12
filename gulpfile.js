'use strict'
const gulp			= require('gulp');
const pug			= require('gulp-pug');
const stylus		= require('gulp-styl');
const prefix		= require('gulp-autoprefixer');
const sourcemaps	= require('gulp-sourcemaps');
const ghPages		= require('gulp-gh-pages');
const browserSync	= require('browser-sync');

gulp.task('pug', function() {
	gulp.src('build/**/*.pug')
		.pipe(sourcemaps.init())
			.pipe(pug())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./'))
});

gulp.task('styl', function() {
	gulp.src('build/assets/stylus/**/*.styl')
		.pipe(sourcemaps.init())
			.pipe(stylus({
				compress: true
			}))
			.pipe(prefix({
				browsers: ['last 2 versions'],
				cascade: false
			}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('assets/css/'));
});

gulp.task('deploy', function() {
	return gulp.src('./**/*')
		.pipe(ghPages({
			branch: ['master']
		}));
});

gulp.task('browser-sync', ['pug', 'styl'], function() {
	browserSync({
		server: {
			baseDir: './'
		}
	});

	gulp.watch('build/assets/stylus/**/*.styl', ['styl']);
	gulp.watch('build/**/*.pug', ['pug']);
	gulp.watch('./**/*.{html,css,js}').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
