module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback) {
        var sources = [
            {
                input: [
                    PATHS.src + '/resources/pages/**/*.twig'
                ],
                output: '/pages'
            }
            // {
            //     input: [
            //         PATHS.src + '/resources/pages/**/*.twig'
            //     ],
            //     output: '/resources/pages/'
            // }
            // {
            //     input: [
            //         PATHS.packages + '/**/*.twig'
            //     ],
            //     output: '/submodules'
            // }
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
            .pipe(GULP.dest(PATHS.dest + source.output));

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}