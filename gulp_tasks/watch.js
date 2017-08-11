module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        PLUGINS.watch([
            process.env.SRC + '/resources/**',
            '!' + process.env.SRC + '/resources/**/stylesheets/**/*.scss',
            '!' + process.env.SRC + '/resources/**/*.twig',,
            '!' + process.env.SRC + '/resources/main/images/layout/svg-sprite/**/*.svg',
            '!' + process.env.SRC + '/resources/main/images/layout/sprite/**/*.png',
            '!' + process.env.SRC + '/resources/**/javascripts/**/*.js',
        ], {
            read: false
        }, function () {
            return GULP.start('sync');
        });

        PLUGINS.watch([
            process.env.SRC + '/resources/**/stylesheets/**/*.scss',
        ], function () {
            console.log('stylesheets');
            return GULP.start('stylesheets');
        });

        PLUGINS.watch([
            process.env.SRC + '/resources/**/*.twig',
        ], function () {
            return GULP.start('twig');
        });

        PLUGINS.watch([
            process.env.SRC + '/resources/main/images/layout/svg-sprite/**/*.svg',
        ], function () {
            console.log('SVG');
            return GULP.start('svgstore');
        });

        PLUGINS.watch([
            process.env.SRC + '/resources/main/images/layout/sprite/**/*.png',
        ], function () {
            return GULP.start('spritesmith');
        });

        PLUGINS.watch([
            process.env.SRC + '/resources/**/javascripts/**/*.js',
        ], function () {
            return GULP.start('javascripts');
        });
    }
}