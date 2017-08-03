module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        var sources = [
            {
                input: [
                    PATHS.src + '/browserconfig.xml'
                ],
                output: PATHS.dest,
                options: {
                    nodir: true
                }
            },
            {
                input: [
                    PATHS.src + '/resources/**',
                    '!**/sprite/**', // Don't include generator files
                    '!**/svg-sprite/**',  // Don't include generator files
                    '!**/*.scss',  // Don't include generator files
                    '!**/*.md',  // Don't include generator files
                    '!**/*.twig',  // Don't include generator files
                ],
                output: PATHS.dest + '/resources',
                options: {
                    nodir: true
                }
            },
            {
                input: [
                    PATHS.bower + '/**',PATHS.bower + '/**',
                    '!' + PATHS.bower + '/**/src/**',  // Don't include package source dev file
                    '!' + PATHS.bower + '/bourbon/**'  // Don't include preprocessor libraries
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