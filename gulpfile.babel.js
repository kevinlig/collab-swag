import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import connect from 'gulp-connect';
import sass from 'gulp-sass';
import merge from 'merge-stream';
import del from 'del';
import git from 'gulp-git';
import replace from 'gulp-replace';

let devMode = false

let commitHash = '';


gulp.task('clean', () => {
	return del('./public/**/*');
});

gulp.task('sass', ['clean'], () => {

	if (devMode) {
		// set up a watcher
		gulp.watch('./src/sass/**/*.scss')
			.on('change', () => {
				gutil.log('Reloading CSS...');
				return gulp.src('./src/sass/**/*.scss')
					.pipe(sass.sync().on('error', sass.logError))
					.pipe(gulp.dest('./public/css'))
					.pipe(connect.reload())
					.on('end', () => {
                        gutil.log('CSS done.');
                    });
			});
	}

	return gulp.src('./src/sass/**/*.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest('./public/css'));
});

gulp.task('copy', ['sass'], () => {
	return merge(
		gulp.src('./src/index.html')
			.pipe(gulp.dest('./public')),
		gulp.src('./src/fonts/**/*')
			.pipe(gulp.dest('./public/fonts'))
	);
	
});

gulp.task('compile', ['copy'], () => {
	const buildOpts = {
		entries: './src/js/main.jsx',
		debug: true
	};

	let bundler = browserify(buildOpts);

	if (devMode) {
		// use watchify to auto recompile
		bundler = watchify(browserify(buildOpts));

		bundler.on('update', () => {
			gutil.log('Recompiling...');
			bundler.bundle()
				.on('error', gutil.log)
				.pipe(source('app.js'))
				.pipe(gulp.dest('./public/js'))
				.pipe(connect.reload())
				.on('end', () => {
					gutil.log('Done');
				});

		})
	}

	return bundler
		.transform('babelify', { presets: ['es2015', 'react'] })
		.bundle()
		.on('error', gutil.log)
		.pipe(source('app.js'))
		.pipe(gulp.dest('./public/js'));
});

gulp.task('minify', ['compile'], () => {
	return gulp.src('./public/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('fetchHash', ['minify'], (done) => {
	git.revParse({args: '--short HEAD', quiet: true}, (err, hash) => {
		commitHash = hash;
		done();
	});
});

gulp.task('release', ['fetchHash'], () => {
	return gulp.src('./public/index.html')
		// replace the script tag source with a versioned URL
		.pipe(replace('js/app.js', 'js/app.js?v=' + commitHash))
		// do the same with CSS
		.pipe(replace('css/style.css', 'css/style.css?v=' + commitHash))
		.pipe(gulp.dest('./public'));
});

gulp.task('build', ['release']);

gulp.task('set-dev', () => {
	devMode = true;
	process.env.NODE_ENV = 'development';
});

gulp.task('set-prod', () => {
	devMode = false;
	process.env.NODE_ENV = 'production';
})

gulp.task('dev', ['set-dev', 'compile'], () => {
	connect.server({
		port: 5000,
		root: './public',
		livereload: true
	});
})

gulp.task('default', ['set-prod','build']);