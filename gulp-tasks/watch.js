module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        PLUGINS.watch([
            PATHS.src + '/resources/**'
        ], function () {
            return GULP.start('sync');
        });

        PLUGINS.watch([
            PATHS.src + '/resources/**/stylesheets/**/*.scss',
        ], function () {
            return GULP.start('stylesheets');
        });

        PLUGINS.watch([
            PATHS.src + '/resources/main/images/layout/svg-sprite/**/*.svg',
        ], function () {
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