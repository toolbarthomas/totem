// Load Gulp.js
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
    runSequence: require('run-sequence'),
    sassIncludePaths: require('sass-include-paths')
}

// All path definitions for our Gulp workflow
const PATHS = {
    src: './src',
    dest: './dist',
    tmp: './.tmp',
    packages: '',
    bower: 'bower_components',
}

// Paths to ignore for sass compilation
const IGNORE_PATHS = [
    '**/__*'
];

// Revision timestamp of the current date in seconds
const REVISION = new Date().getTime();

// Define package Path
NODE_MODULES.fse.pathExists('git-submodules', (error, exists) => {
    if (error) {
        throw (error);
        return;
    }

    if (exists) {
        IGNORE_PATHS.push('bower_components')
    } else {
        IGNORE_PATHS.push('git-submodules')
    }
});

// Helper function for defining tasks
function getGulpTask(file)
{
    return require('./gulp-tasks/' + file)(GULP, PLUGINS, NODE_MODULES, PATHS, REVISION);
}

// Prepare tasks
GULP.task('clean', getGulpTask('clean'));
GULP.task('sync', getGulpTask('sync'));

// Styling tasks
GULP.task('spritesmith', getGulpTask('spritesmith'));
GULP.task('sass', getGulpTask('sass'));
GULP.task('svgstore', getGulpTask('svgstore'));

// Scripting tasks
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
        'concat',
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