module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        var stylesheets = GULP.src([
            PATHS.dest + '/resources/**/stylesheets/**/*.css',
            '!**/*.min*'
        ], {
            nodir: true
        })
        .pipe(PLUGINS.combineMq({
            beautify: false
        }))
        .pipe(PLUGINS.cssnano())
        .pipe(PLUGINS.rename({
            suffix: '.min'
        }))
        .pipe(GULP.dest(PATHS.dest + '/resources' ));

        var javascripts = GULP.src([
            PATHS.dest + '/resources/**/javascripts/**/*.js',
            '!' + PATHS.dest + '/resources/main/javascripts/lib/**/*',
            '!**/*.min*'
        ], {
            nodir: true
        })
        .pipe(PLUGINS.uglify())
        .pipe(PLUGINS.rename({
            suffix: '.min'
        }))
        .pipe(GULP.dest(PATHS.dest + '/resources' ));

        return NODE_MODULES.merge(javascripts);
    }
}