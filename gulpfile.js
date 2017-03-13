'use strict'
const gulp			= require('gulp');
const pug			= require('gulp-pug');
const sass			= require('gulp-sass');
const prefix		= require('gulp-autoprefixer');
const sourcemaps	= require('gulp-sourcemaps');
const tinypng		= require('gulp-tinypng');
const browserSync	= require('browser-sync');

gulp.task('pug', function() {
	gulp.src('build/**/*.pug')
		.pipe(sourcemaps.init())
			.pipe(pug())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./'))
});

gulp.task('sass', function() {
	gulp.src('build/assets/sass/**/*.sass')
		.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(prefix({
				browsers: ['last 2 versions'],
				cascade: false
			}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('assets/css/'));
});

gulp.task('browser-sync', ['pug', 'sass'], function() {
	browserSync({
		server: {
			baseDir: './'
		}
	});

	gulp.watch('build/assets/sass/**/*.sass', ['sass']);
	gulp.watch('build/**/*.pug', ['pug']);
	gulp.watch('build/assets/images/**/*.{png,jpg,jpeg}', ['images']);
	gulp.watch('build/assets/images/**/*.svg', ['svg']);
	gulp.watch('build/assets/fonts/**/*', ['fonts']);
	gulp.watch('assets/images/**/*').on('change', browserSync.reload);
	gulp.watch('assets/**/*.{css,js}').on('change', browserSync.reload);
	gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('fonts', function() {
	return gulp.src('build/assets/fonts/**/*')
		.pipe(gulp.dest('./assets/fonts'))
});

gulp.task('images', function() {
	return gulp.src('build/assets/images/**/*.{png,jpg,jpeg}')
		.pipe(tinypng({
			key: 'XQVIk6EjMvJX0hY9uhoxgT-DXOxFAtPn',
			sigFile: 'images/.tinypng-sigs',
			log: true
		}))
		.pipe(gulp.dest('./assets/images/'))
});

gulp.task('svg', function() {
	return gulp.src('build/assets/images/**/*.svg')
		.pipe(gulp.dest('./assets/images/'))
});

gulp.task('default', ['browser-sync']);
