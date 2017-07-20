module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        PLUGINS.watch([
            PATHS.src + '/resources/**',
            '!' + PATHS.src + '/resources/**/stylesheets/**/*.scss',
            '!' + PATHS.src + '/resources/**/*.twig',,
            '!' + PATHS.src + '/resources/main/images/layout/svg-sprite/**/*.svg',
            '!' + PATHS.src + '/resources/main/images/layout/sprite/**/*.png',
            '!' + PATHS.src + '/resources/**/javascripts/**/*.js',
        ], {
            read: false
        }, function () {
            return GULP.start('sync');
        });

        PLUGINS.watch([
            PATHS.src + '/resources/**/stylesheets/**/*.scss',
        ], function () {
            console.log('stylesheets');
            return GULP.start('stylesheets');
        });

        PLUGINS.watch([
            PATHS.src + '/resources/**/*.twig',
        ], function () {
            console.log('TWIG');
            return GULP.start('twig');
        });

        PLUGINS.watch([
            PATHS.src + '/resources/main/images/layout/svg-sprite/**/*.svg',
        ], function () {
            console.log('SVG');
            return GULP.start('svgstore');
        });

        PLUGINS.watch([
            PATHS.src + '/resources/main/images/layout/sprite/**/*.png',
        ], function () {
            return GULP.start('spritesmith');
        });

        PLUGINS.watch([
            PATHS.src + '/resources/**/javascripts/**/*.js',
        ], function () {
            return GULP.start('javascripts');
        });
    }
}