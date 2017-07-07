module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        var resources = GULP.src([
            PATHS.src + '/resources/**',
            '!**/sprite/**',
            '!**/svg-sprite/**',
            '!**/*.scss',
            '!**/*.md',
            '!**/*.twig',
        ], {
            nodir: true
        })
        .pipe(GULP.dest(PATHS.dest + '/resources'));

        var bower_components = GULP.src([
            './bower_components/jquery/**',
            './bower_components/svg-sprite-injector/**'
        ], {
            nodir: true,
            base: '.'
        })
        .pipe(PLUGINS.flatten({
            subPath: 1
        }))
        .pipe(GULP.dest(PATHS.dest + '/resources/base/javascripts/lib'));

        return NODE_MODULES.merge(resources, bower_components);
    }
}