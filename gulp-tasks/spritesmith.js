module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        NODE_MODULES.del(PATHS.dest + '/resources/base/images/sprite.*.png');

        var spritesmith = GULP.src(PATHS.src + '/resources/base/images/layout/sprite/**/*.png')
        .pipe(PLUGINS.plumber())
        .pipe(PLUGINS.spritesmith({
            padding: 4,
            imgName: 'sprite.' + REVISION + '.png',
            cssName: '_spritesmith.scss',
            cssTemplate: PATHS.src + '/resources/base/images/layout/sprite/config.handlebars',
            cssHandlebarsHelpers: {
                imageSource: function (image) {
                    return '/resources/base/images/sprite.' + REVISION + '.png';
                },
                divideRetina: function (value) {
                    return parseInt(value) / 2;
                }
            }
        }));

        var sprite = spritesmith.img
        .pipe(NODE_MODULES.buffer())
        .pipe(GULP.dest(PATHS.dest + '/resources/base/images/layout/'));


        var stylesheet = spritesmith.css
        .pipe(GULP.dest(PATHS.src + '/resources/base/stylesheets/elements/'));

        return NODE_MODULES.merge(sprite, stylesheet).pipe(PLUGINS.connect.reload());
    }
}