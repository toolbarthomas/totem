module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        var templates = GULP.src(PATHS.src + '/resources/templates/*/stylesheets/*.scss')
        .pipe(PLUGINS.sourcemaps.init())
        .pipe(PLUGINS.sassGlob({
            ignorePaths: [
                '**/__*.scss'
            ]
        }))
        .pipe(PLUGINS.sass().on('error', PLUGINS.sass.logError))
        .pipe(PLUGINS.sourcemaps.write('./'))
        .pipe(GULP.dest(PATHS.dest + '/resources/templates'));

        var pages = GULP.src(PATHS.src + '/resources/pages/*/stylesheets/*.scss')
        .pipe(PLUGINS.sourcemaps.init())
        .pipe(PLUGINS.sassGlob({
            ignorePaths: [
                '**/__*.scss'
            ]
        }))
        .pipe(PLUGINS.sass().on('error', PLUGINS.sass.logError))
        .pipe(PLUGINS.sourcemaps.write('./'))
        .pipe(GULP.dest(PATHS.dest + '/resources/pages'));

        return NODE_MODULES.merge(templates, pages);
    }
}