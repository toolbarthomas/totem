module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        PLUGINS.livereload.listen();

        GULP.watch([
            process.env.SRC + '/resources/**',
            '!' + process.env.SRC + '/resources/**/stylesheets/**/*.scss',
            '!' + process.env.SRC + '/resources/**/*.twig',
            '!' + process.env.SRC + '/resources/main/images/layout/svg-sprite/**/*.svg',
            '!' + process.env.SRC + '/resources/main/images/layout/sprite/**/*.png',
            '!' + process.env.SRC + '/resources/**/javascripts/**/*.js'
        ], ['sync']);

        GULP.watch([
            process.env.SRC + '/resources/**/stylesheets/**/*.scss',
            process.env.SUBMODULES_PATH + '/**/stylesheets/**/*.scss'
        ], ['sass']);

        GULP.watch([
            process.env.SRC + '/resources/**/*.twig',
            process.env.SUBMODULES_PATH + '/**/*.twig'
        ], ['twig']);

        GULP.watch([
            process.env.SRC + '/resources/main/images/layout/svg-sprite/**/*.svg'
        ], ['svgstore']);

        GULP.watch([
            process.env.SRC + '/resources/main/images/layout/sprite/**/*.png'
        ], ['spritesmith']);

        GULP.watch([
            process.env.SRC + '/resources/**/javascripts/**/*.js',
            process.env.SUBMODULES_PATH + '/**/javascripts/**/*.js'
        ], ['javascripts']);
    }
}