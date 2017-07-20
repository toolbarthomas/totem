module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        return GULP.src(PATHS.src + '/resources/templates/*/stylesheets/*.scss')
        .pipe(PLUGINS.sourcemaps.init())
        .pipe(PLUGINS.sassGlob({
            ignorePaths: [
                '**/__*.scss'
            ]
        }))
        .pipe(PLUGINS.sass().on('error', PLUGINS.sass.logError))
        .pipe(PLUGINS.sourcemaps.write('./'))

        .pipe(GULP.dest(PATHS.dest + '/resources/templates'))
        .pipe(PLUGINS.connect.reload());
    }
}