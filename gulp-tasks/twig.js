module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback) {
        var sources = [
            {
                input: [
                    PATHS.src + '/resources/pages/**/*.twig'
                ],
                output: PATHS.dest + '/pages'
            },
            {
                input: [
                    PATHS.src + '/resources/modules/**/*.twig'
                ],
                output: PATHS.dest + '/resources/modules'
            }
        ];

        var streams = [];

        sources.forEach(function(source) {
            var stream = GULP.src(source.input, {
                nodir: true
            })
            .pipe(PLUGINS.plumber())
            .pipe(PLUGINS.twig({
                base: PATHS.src + '/resources',
                errorLogToConsole: true
            }))
            .pipe(PLUGINS.faker())
            .pipe(GULP.dest(source.output));

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}