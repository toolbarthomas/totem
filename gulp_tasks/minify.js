module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        var stylesheets = GULP.src([
            process.env.TOTEM_DEST + '/resources/**/stylesheets/**/*.css',
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
        .pipe(GULP.dest(process.env.TOTEM_DEST + '/resources' ));

        var javascripts = GULP.src([
            process.env.TOTEM_DEST + '/resources/**/javascripts/**/*.js',
            '!' + process.env.TOTEM_DEST + '/resources/main/javascripts/lib/**/*',
            '!**/*.min*'
        ], {
            nodir: true
        })
        .pipe(PLUGINS.uglify())
        .pipe(PLUGINS.rename({
            suffix: '.min'
        }))
        .pipe(GULP.dest(process.env.TOTEM_DEST + '/resources' ));

        return NODE_MODULES.merge(stylesheets, javascripts);
    }
}