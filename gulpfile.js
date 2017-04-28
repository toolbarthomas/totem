var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var buffer = require('vinyl-buffer');
var del = require('del');
var merge = require('merge-stream');
var path = require('path');
var runSequence = require('run-sequence');


const SRC = './src';
const DEST = './dist';
const PACKAGES = './bower_components';

function clean()
{
    return del([DEST]);
}

function sync()
{
    var sync = gulp.src([
        SRC + '/assets/**/',
        '!**/scss/**',
        '!**/js/components/**',
        '!**/sprite/**',
        '!**/svg-sprite/**',
        '!**/layouts/**',
        '!**/partials/**',
        '!**/templates/**'
    ], { nodir: true })
    .pipe(plugins.changed(DEST))
    .pipe(gulp.dest(DEST));
}

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

function spritesmith()
{
    var spritesmith = gulp.src(SRC + '/assets/img/layout/sprite/**.png')
    .pipe(plugins.plumber())
    .pipe(plugins.spritesmith({
        padding: 4,
        imgName: 'sprite.png',
        cssName: 'totem.sprite.css',
        cssTemplate: SRC + '/assets/img/layout/sprite/config.handlebars',
        cssHandlebarsHelpers : {
            outputSprite : function(image)
            {
                return '/assets/img/layout/sprite.png';
            },
            divideRetina : function(value) {
                return parseInt(value) / 2;
            }
        }
    }));

    var img = spritesmith.img
    .pipe(buffer())
    .pipe(gulp.dest(DEST + '/assets/img/layout/'));

    var css = spritesmith.css
    .pipe(gulp.dest(DEST + '/assets/css/'));

    return merge(img, css).pipe(plugins.connect.reload());
}

function svgstore()
{
    var svgstore = gulp.src(
        [
        SRC + '/assets/img/layout/svg-sprite/**.svg'
        ])
    .pipe(plugins.plumber())
    .pipe(plugins.filter(function(file) {
        return file.stat && file.contents.length;
    }))
    .pipe(plugins.rename({prefix: 'glyph-'}))
    .pipe(plugins.svgmin(function (file) {
        var prefix = path.basename(file.relative, path.extname(file.relative));

        return {
            plugins: [
            {
                cleanupIDs: {
                    prefix: prefix + '-',
                    minify: true
                },
            },
            {
                removeAttrs: {
                    attrs: [
                    '(fill|stroke|class|style)',
                    'svg:(width|height)'
                    ]
                }
            }
            ]
        }
    }))
    .pipe(plugins.svgstore({
        inlineSvg: true
    }))
    .pipe(gulp.dest(DEST + '/assets/img/layout/'))

    return svgstore.pipe(plugins.connect.reload());
}

function concat()
{
    var concat = gulp.src([
        SRC + '/assets/js/components/**.js',
        PACKAGES + '/*totem*/**.js'
        ])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('totem.js'))
    .pipe(gulp.dest(DEST + '/assets/js/'));

    return concat.pipe(plugins.connect.reload());
}

function twig()
{
    var twig = gulp.src([
        SRC + '/**.twig',
        PACKAGES + '/*totem*/**.twig',
        '!/**/layouts/**.twig',
        '!/**/partials/**.twig',
        ])
    .pipe(plugins.plumber())
    .pipe(plugins.twig({
        base : SRC,
        errorLogToConsole : true
    }))
    .pipe(plugins.faker())
    .pipe(gulp.dest(DEST + '/pages'));

    return twig.pipe(plugins.connect.reload());
}

function connect()
{
    plugins.connect.server({
        root: DEST,
        livereload: true
    });
}

gulp.task('clean', function() {
    return clean();
});

gulp.task('sync', function() {
   return sync();
});

gulp.task('sass', function() {
    return sass();
});

gulp.task('spritesmith', function() {
    return spritesmith();
});

gulp.task('svgstore', function () {
    return svgstore();
});

gulp.task('concat', function () {
    return concat();
});

gulp.task('twig', function () {
    return twig();
});

gulp.task('connect', function() {
    return connect();
});

gulp.task('styles', function( callback ) {
    runSequence(
        'sass',
        'spritesmith',
        'svgstore',
        callback
    );
});

gulp.task('scripts', function( callback ) {
    runSequence(
        'concat',
        callback
    );
});

gulp.task('pages', function( callback ) {
    runSequence(
        'twig',
        callback
    );
});

gulp.task('watch', function() {
    // plugins.watch([
    //         SRC + '/assets/**/*',
    //     ], function() {
    //         gulp.start('copy');
    //     }
    // );

    // plugins.watch([
    //         SRC + '/assets/**/*.scss',
    //         PACKAGES + '/**/*.scss',
    //     ], function() {
    //         gulp.start('styles');
    //     }
    // );

    // plugins.watch([
    //         SRC + '/assets/img/layout/svg-sprite/**/*.svg',
    //     ], function() {
    //         gulp.start('svgstore');
    //     }
    // );

    // plugins.watch([
    //         SRC + '/assets/img/layout/sprite/**/*.png',
    //     ], function() {
    //         gulp.start('spritesmith');
    //     }
    // );

    // plugins.watch([
    //         SRC + '/assets/**/*.js',
    //         PACKAGES + '/**/tipi.*.js'
    //     ], function() {
    //         gulp.start('javascripts');
    //     }
    // );

    // plugins.watch([
    //         SRC + '/**/*.twig',
    //         PACKAGES + '/*tipi*/*.twig',
    //     ], function() {
    //         gulp.start('pages');
    //     }
    // );
});

gulp.task('serve', function( callback ) {
    runSequence(
        'clean',
        [
            'sync',
            'styles',
            'scripts',
            'pages'
        ],
        'connect',
        'watch',
        callback
    );
});

gulp.task('default', function( callback ) {
    runSequence(
        'clean',
        [
            'sync',
            'styles',
            'scripts',
            'pages'
        ],
        callback
    );
});