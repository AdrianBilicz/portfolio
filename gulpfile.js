/* gulp dependencies */
const gulp = require('gulp');  
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const minifycss = require('gulp-minify-css');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


// gulp.task('serve',function(){
// 	browserSync.init({
// 		server: {
// 			baseDir: './dist'
// 		}
// 	})
// })


/* scripts task */
gulp.task('scripts', function() {
	return gulp.src([
		'./public/javascripts/*.js'
	])
	.pipe(concat('all.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({stream:true}));
});

/* sass task */
gulp.task('sass', function() {
    var processors = [
        autoprefixer({browsers: ['last 4 versions']}),
    ];  
	gulp.src('./public/stylesheets/sass/*.sass')
		.pipe(plumber())
		.pipe(sass({
			includePaths: ['sass']
		}))
		.pipe(postcss(processors))
		.pipe(gulp.dest('dist/css'))
});

/* postcss/cssnano task */
gulp.task('css', function() {
    var processors = [
        autoprefixer({browsers: ['last 4 versions']}),
        cssnano(),
    ];
    return gulp.src('dist/css/styles.css')
        .pipe(postcss(processors))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

/* reload task */
// gulp.task('bs-reload', function() {
// 	browserSync.reload();
// });

gulp.task('images', function(){
	gulp.src('./public/images/*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({stream:true}))
})

/* watch sass, js and html files, doing different things with each. */
gulp.task('default', ['sass', 'css','images'], function() {
	/* watch sass, run the sass task on change. */
	gulp.watch(['./public/stylesheets/sass/**/*.sass','./public/stylesheets/sass/*.sass'], ['sass', 'css']);
	/* watch app.js file, run the scripts task on change. */
	gulp.watch(['./public/javascripts/*.js'], ['scripts']);
	/* watch .html files, run the bs-reload task on change. */
	// gulp.watch(['./dist/css/*.css','./dist/*.html'],['bs-reload']);
});