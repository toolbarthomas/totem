module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        PLUGINS.livereload.listen();

        PLUGINS.watch([
            process.env.SRC + '/resources/**',
            '!**/resources/**/*.twig',
            '!**/resources/**/stylesheets/**/*.scss',
            '!**/resources/**/javascripts/**/*.js',
            '!**/resources/**/svg-sprite/**/*.svg',
            '!**/resources/**/sprite/**/*.png',
        ], {
            read: false
        }, function () {
            return GULP.start('sync');
        });

        PLUGINS.watch([
            process.env.SRC + '/resources/**/stylesheets/**/*.scss',
        ], function () {
            return GULP.start('stylesheets');
        });

        PLUGINS.watch([
            process.env.SRC + '/resources/**/javascripts/**/*.js',
        ], function () {
            return GULP.start('javascripts');
        });

        PLUGINS.watch([
            process.env.SRC + '/resources/**/svg-sprite/**/*.svg',
        ], function () {
            return GULP.start('svgstore');
        });

        PLUGINS.watch([
            process.env.SRC + '/resources/**/sprite/**/*.png',
        ], function () {
            return GULP.start('spritesmith');
        });

        PLUGINS.watch([
            process.env.SRC + '/resources/**/*.twig',
            '!' + process.env.SRC + '/resources/tmp/**/*.twig',
        ], function () {
            return GULP.start('twig');
        });
    }
}