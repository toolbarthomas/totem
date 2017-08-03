module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        var sources = [
            {
                input: [
                    PATHS.src + '/resources/**',
                    '!**/sprite/**',
                    '!**/svg-sprite/**',
                    '!**/*.scss',
                    '!**/*.md',
                    '!**/*.twig',
                ],
                output: PATHS.dest + '/resources',
                options: {
                    nodir: true
                }
            },
            {
                input: [
                    PATHS.bower + '/**',
                    '!' + PATHS.bower + '/bourbon/**'
                ],
                output: PATHS.dest + '/resources/main/javascripts/lib',
                options: {
                    nodir: true
                }
            }
        ];

        var streams = [];

        sources.forEach(function(source) {
            var stream = GULP.src(source.input, source.options)
                .pipe(GULP.dest(source.output));

            streams.push(stream);
        });

        return NODE_MODULES.merge(streams);
    }
}