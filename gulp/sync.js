module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        return GULP.src([
            PATHS.src + '/assets/**',
            '!**/scss/**',
            '!**/js/components/**',
            '!**/sprite/**',
            '!**/svg-sprite/**',
            '!**/layouts/**',
            '!**/partials/**',
            '!**/templates/**'
        ], {
            nodir: true
        })
        .pipe(PLUGINS.changed(PATHS.dest))
        .pipe(GULP.dest(PATHS.dest + '/assets'));
    }
}