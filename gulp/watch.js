module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        PLUGINS.watch([
            PATHS.src + '/assets/**'
        ], function () {
            return GULP.start('sync');
        });

        PLUGINS.watch([
            PATHS.src + '/assets/**/*.scss',
            PATHS.PACKAGES + '/**/*.scss',
        ], function () {
            return GULP.start('stylesheets');
        });

        PLUGINS.watch([
            PATHS.src + '/assets/img/layout/svg-sprite/**/*.svg',
        ], function () {
            return GULP.start('svgstore');
        });

        PLUGINS.watch([
            PATHS.src + '/assets/img/layout/sprite/**/*.png',
        ], function () {
            return GULP.start('spritesmith');
        });

        PLUGINS.watch([
            PATHS.src + '/assets/**/*.js',
            PATHS.PACKAGES + '/*totem*/**/*.js'
        ], function () {
            return GULP.start('javascripts');
        });
    }
}