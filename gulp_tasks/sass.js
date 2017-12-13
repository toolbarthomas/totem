module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        // Define the properties for each category
        var sources = [
            {
                input: [
                    process.env.TOTEM_SRC + '/resources/main/stylesheets/*.scss'
                ],
                output: process.env.TOTEM_DEST + '/resources/main/stylesheets'
            },
            {
                input: [
                    process.env.TOTEM_SRC + '/resources/modules/*/stylesheets/*.scss',
                    process.env.TOTEM_SUBMODULES + '/totem.module.*/stylesheets/*.scss'
                ],
                output: process.env.TOTEM_DEST + '/resources/modules'
            },
            {
                input: [
                    process.env.TOTEM_SRC + '/resources/groups/*/stylesheets/*.scss',
                    process.env.TOTEM_SUBMODULES + '/totem.group.*/stylesheets/*.scss'
                ],
                output: process.env.TOTEM_DEST + '/resources/groups'
            },
            {
                input: [
                    process.env.TOTEM_SRC + '/resources/templates/*/stylesheets/*.scss',
                    process.env.TOTEM_SUBMODULES + '/totem.template.*/stylesheets/*.scss',
                ],
                output: process.env.TOTEM_DEST + '/resources/templates'
            }
        ];

        var streams = [];

        sources.forEach(function (source) {

            var stream = GULP.src(source.input)
                .pipe(PLUGINS.sourcemaps.init())
                .pipe(PLUGINS.sassGlob())
                .pipe(PLUGINS.sass().on('error', PLUGINS.sass.logError))
                .pipe(PLUGINS.autoprefixer())
                .pipe(PLUGINS.sourcemaps.write('./'))
                .pipe(GULP.dest(source.output))

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams).pipe(PLUGINS.livereload({
            quiet: true
        }));
    }
}