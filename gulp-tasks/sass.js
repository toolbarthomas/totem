module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        var sources = [
            {
                input: [
                    PATHS.src + '/resources/templates/*/stylesheets/*.scss'
                ],
                output: PATHS.dest + '/resources/templates'
            },
            {
                input: [
                    PATHS.src + '/resources/pages/*/stylesheets/*.scss'
                ],
                output: PATHS.dest + '/resources/pages'
            },
            {
                input: [
                    PATHS.src + '/resources/modules/*/stylesheets/*.scss'
                ],
                output: PATHS.dest + '/resources/modules'
            }
        ];

        var streams = [];

        sources.forEach(function (source) {
            var stream = GULP.src(source.input)
            .pipe(PLUGINS.sourcemaps.init())
            .pipe(PLUGINS.sassGlob({
                ignorePaths: [
                    '**/__*.scss'
                ]
            }))
            .pipe(PLUGINS.sass().on('error', PLUGINS.sass.logError))
            .pipe(PLUGINS.sourcemaps.write('./'))
            .pipe(GULP.dest(source.output))

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}