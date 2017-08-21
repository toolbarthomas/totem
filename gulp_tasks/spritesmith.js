module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        NODE_MODULES.del(process.env.DEST + '/resources/main/images/sprite.*.png');

        var spritesmith = GULP.src(process.env.SRC + '/resources/main/images/layout/sprite/**/*.png')
        .pipe(PLUGINS.plumber())
        .pipe(PLUGINS.spritesmith({
            padding: 4,
            imgName: 'sprite.' + REVISION + '.png',
            cssName: '_spritesmith.scss',
            cssTemplate: process.env.SRC + '/resources/main/images/layout/sprite/config.handlebars',
            cssHandlebarsHelpers: {
                imageSource: function (image) {
                    return '/resources/main/images/sprite.' + REVISION + '.png';
                },
                divideRetina: function (value) {
                    return parseInt(value) / 2;
                }
            }
        }));

        var sprite = spritesmith.img
        .pipe(NODE_MODULES.buffer())
        .pipe(GULP.dest(process.env.DEST + '/resources/main/images/layout/'));


        var stylesheet = spritesmith.css
        .pipe(GULP.dest(process.env.SRC + '/resources/main/stylesheets/settings/'));

        return NODE_MODULES.merge(sprite, stylesheet).pipe(PLUGINS.connect.reload());
    }
}