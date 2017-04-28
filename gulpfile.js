var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var runSequence = require('run-sequence');

const SRC = './src';
const DEST = './dist';
const PACKAGES = './modules';

function sass()
{
    var sass = gulp.src(SRC + '/assets/scss/totem.scss')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sassGlob({
        ignorePaths: [
            '**/__*.scss'
        ]
    }))
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST + '/assets/css'));

    return sass.pipe(plugins.connect.reload());
}

gulp.task('sass', function() {
   return sass();
});

gulp.task('stylesheets', function(callback) {
    runSequence(
        'sass',
        callback
    );
});

gulp.task('default', function(callback) {
    return;
});