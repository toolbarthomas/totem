// Require Node dotenv to enable environment variables
const ENV = require('dotenv').config();
if (ENV.error) {
    throw 'Cannot load the environment file at: /.env. You can create one by using the included .env.dist file.';
}

// Load Gulp
const GULP = require('gulp');

// Load all Gulp plugins dynamicly
const PLUGINS = require('gulp-load-plugins')();

// Define the required node modules we use for our Gulp workflow
const NODE_MODULES = {
    buffer: require('vinyl-buffer'),
    fse: require('fs-extra'),
    del: require('del'),
    merge: require('merge-stream'),
    path: require('path'),
    runSequence: require('run-sequence').use(GULP),
    globby: require('globby'),
    browserify: require('browserify'),
    vinylSourceStream: require('vinyl-source-stream'),
    camelCase: require('camelcase')
}

// Revision timestamp of the current date in seconds
const REVISION = new Date().getTime();

// Helper function for defining tasks
function getGulpTask(file)
{
    return require('./gulp_tasks/' + file)(GULP, PLUGINS, NODE_MODULES, REVISION);
}

// Prepare tasks
GULP.task('clean', getGulpTask('clean'));
GULP.task('sync', getGulpTask('sync'));

// Styling tasks
GULP.task('spritesmith', getGulpTask('spritesmith'));
GULP.task('sass', getGulpTask('sass'));
GULP.task('svgstore', getGulpTask('svgstore'));

// Scripting tasks
GULP.task('bundle', getGulpTask('bundle'));
GULP.task('concat', getGulpTask('concat'));

// Content tasks
GULP.task('twig', getGulpTask('twig'));

// Development tasks
GULP.task('connect', getGulpTask('connect'));
GULP.task('watch', getGulpTask('watch'));

// Production tasks
GULP.task('minify', getGulpTask('minify'));

GULP.task('stylesheets', function(callback) {
    NODE_MODULES.runSequence(
        'spritesmith',
        [
            'sass',
            'svgstore'
        ],
        callback
    );
});

GULP.task('javascripts', function(callback) {
    NODE_MODULES.runSequence(
        [
            'concat',
            'bundle',
        ],
        callback
    );
});

GULP.task('default', function (callback) {
    NODE_MODULES.runSequence(
        'clean',
        'sync',
        [
            'stylesheets',
            'javascripts',
            'twig'
        ],
        callback
    );
});

GULP.task('build', function (callback) {
    NODE_MODULES.runSequence(
        'default',
        [
            'minify'
        ],
        callback
    );
});

GULP.task('serve', function (callback) {
    NODE_MODULES.runSequence(
        'default',
        [
            'connect',
            'watch'
        ],
        callback
    );
});