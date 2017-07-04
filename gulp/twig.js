module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback) {
        var twig_options = {
            base: PATHS.src,
            errorLogToConsole: true
        }

        var src = GULP.src([
            PATHS.src + '/**/*.twig',
            '!' + PATHS.src + '/**/assets/**/*.twig',
            '!' + PATHS.src + '/**/layouts/**/*.twig',
            '!' + PATHS.src + '/**/partials/*.twig',
        ], {
            nodir: true
        })
        .pipe(PLUGINS.plumber())
        .pipe(PLUGINS.twig(twig_options))
        .pipe(PLUGINS.faker())
        .pipe(GULP.dest(PATHS.dest));

        var modules = GULP.src([
            PATHS.modules + '/**/*.twig'
        ], {
            nodir: true
        })
        .pipe(PLUGINS.plumber())
        .pipe(PLUGINS.twig(twig_options))
        .pipe(PLUGINS.faker())
        .pipe(GULP.dest(PATHS.dest + '/submodules' ));

        return NODE_MODULES.merge(src, modules);
    }
}