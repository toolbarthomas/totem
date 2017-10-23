module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        PLUGINS.livereload.listen();

        PLUGINS.watch([
            'resources/**',
            '!**/resources/**/stylesheets/**/*.scss',
            '!**/resources/**/*.twig',
            '!**/resources/main/images/layout/svg-sprite/**/*.svg',
            '!**/resources/main/images/layout/sprite/**/*.png',
            '!**/resources/**/javascripts/**/*.js'
        ], {
                read: false,
                cwd: process.env.SRC
            }, function () {
                return GULP.start('sync');
            });

        PLUGINS.watch([
            'resources/**/stylesheets/**/*.scss'
        ], {
                cwd: process.env.SRC
            }, function () {
                return GULP.start('stylesheets');
            });

        PLUGINS.watch([
            'resources/main/images/layout/svg-sprite/**/*.svg'
        ], {
                cwd: process.env.SRC
            }, function () {
                return GULP.start('svgstore');
            });

        PLUGINS.watch([
            'resources/main/images/layout/sprite/**/*.png'
        ], {
                cwd: process.env.SRC
            }, function () {
                return GULP.start('spritesmith');
            });

        PLUGINS.watch([
            process.env.SRC + 'resources/**/javascripts/**/*.js',
            process.env.SRC + '**/javascripts/**/*.js'
        ], function () {
            return GULP.start('javascripts');
        });
    }
}