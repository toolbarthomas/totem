module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback) {
        var sources = [
            {
                input: [
                    PATHS.src + '/**/*.twig',
                    '!' + PATHS.src + '/**/assets/**/*.twig',
                    '!' + PATHS.src + '/**/layouts/**/*.twig',
                    '!' + PATHS.src + '/**/partials/*.twig',
                ],
                output: ''
            },
            {
                input: [
                    PATHS.packages + '/**/*.twig'
                ],
                output: '/submodules'
            }
        ];

        var streams = [];

        sources.forEach(function(source) {
            var stream = GULP.src(source.input, {
                nodir: true
            })
            .pipe(PLUGINS.plumber())
            .pipe(PLUGINS.twig({
                base: PATHS.src,
                errorLogToConsole: true
            }))
            .pipe(PLUGINS.faker())
            .pipe(GULP.dest(PATHS.dest + source.output));

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}