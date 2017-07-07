module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        var stylesheets = GULP.src([
            PATHS.dest + '/assets/css/**/*.css'
        ])
        .pipe(PLUGINS.combineMq({
            beautify: false
        }))
        .pipe(plugins.cssnano())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(GULP.dest(PATHS.dest + '/assets/css/'));

        var javascripts = GULP.src([
            '!**/modernizr/**',
            PATHS.dest + '/assets/js/**/*.js',
        ])
        .pipe(PLUGINS.uglify())
        .pipe(PLUGINS.rename({
            suffix: '.min'
        }))
        .pipe(GULP.dest(PATHS.dest + '/assets/js/'));

        return NODE_MODULES.merge(stylesheets, javascripts);
    }
}