import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify-es';
import connect from 'gulp-connect';
import sass from 'gulp-sass';
import merge from 'merge-stream';
import del from 'del';
import git from 'gulp-git';
import replace from 'gulp-replace';

let devMode = false

let commitHash = '';


gulp.task('clean', gulp.series(() => {
	return del('./public/**/*');
}));

gulp.task('sass', gulp.series('clean', () => {

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
}));

gulp.task('copy', gulp.series('sass', () => {
	return merge(
		gulp.src('./src/index.html', { allowEmpty: true })
			.pipe(gulp.dest('./public')),
		gulp.src('./src/fonts/**/*')
			.pipe(gulp.dest('./public/fonts'))
	);
	
}));

gulp.task('compile', gulp.series('copy', () => {
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
		.transform('babelify', { presets: ['@babel/preset-env', '@babel/preset-react'] })
		.bundle()
		.on('error', gutil.log)
		.pipe(source('app.js'))
		.pipe(gulp.dest('./public/js'));
}));

gulp.task('minify', gulp.series('compile', () => {
	return gulp.src('./public/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./public/js'));
}));

gulp.task('fetchHash', gulp.series('minify', (done) => {
	git.revParse({args: '--short HEAD', quiet: true}, (err, hash) => {
		commitHash = hash;
		done();
	});
}));

gulp.task('release', gulp.series('fetchHash', () => {
	return gulp.src('./public/index.html', { allowEmpty: true })
		// replace the script tag source with a versioned URL
		.pipe(replace('js/app.js', 'js/app.js?v=' + commitHash))
		// do the same with CSS
		.pipe(replace('css/style.css', 'css/style.css?v=' + commitHash))
		.pipe(gulp.dest('./public'));
}));

gulp.task('build', gulp.series('release'));

gulp.task('set-dev', gulp.series(function(cb) {
	devMode = true;
	process.env.NODE_ENV = 'development';
	cb();
}));

gulp.task('set-prod', gulp.series(function(cb){
	devMode = false;
	process.env.NODE_ENV = 'production';
	cb();
}));

gulp.task('dev', gulp.series('set-dev', 'compile', () => {
	connect.server({
		port: 5000,
		root: './public',
		livereload: true
	});
}));

gulp.task('default', gulp.series('set-prod','build'));