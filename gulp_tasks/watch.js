module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        PLUGINS.livereload.listen();

        PLUGINS.watch([
            process.env.TOTEM_SRC + '/resources/**',
            '!**/resources/**/*.twig',
            '!**/resources/**/stylesheets/**/*.scss',
            '!**/resources/**/javascripts/**/*.js',
            '!**/resources/**/svg-sprite/**/*.svg',
            '!**/resources/**/sprite/**/*.png'
        ], {
            read: false
        }, function () {
            return GULP.start('sync');
        });

        PLUGINS.watch([
            process.env.TOTEM_SRC + '/resources/**/stylesheets/**/*.scss',
            process.env.TOTEM_SUBMODULES + '/totem.*/stylesheets/**/*.scss',
        ], function () {
            return GULP.start('stylesheets');
        });

        PLUGINS.watch([
            process.env.TOTEM_SRC + '/resources/**/javascripts/**/*.js',
            process.env.TOTEM_SUBMODULES + '/totem.module*/javascripts/**/*.js',
            '!**/lib/**/*.js'
        ], function () {
            return GULP.start('javascripts');
        });

        PLUGINS.watch([
            process.env.TOTEM_SRC + '/resources/**/svg-sprite/**/*.svg',
        ], function () {
            return GULP.start('svgstore');
        });

        PLUGINS.watch([
            process.env.TOTEM_SRC + '/resources/**/sprite/**/*.png',
        ], function () {
            return GULP.start('spritesmith');
        });

        PLUGINS.watch([
            './data.json',
            process.env.TOTEM_SUBMODULES + '/data.json',
            process.env.TOTEM_SRC + '/resources/**/*.twig',
            process.env.TOTEM_SUBMODULES + '/totem*/**/*.twig',
        ], function () {
            return GULP.start('twig');
        });
    }
}