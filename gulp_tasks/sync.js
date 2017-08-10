module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        var sources = [
            {
                input: [
                    process.env.SRC + '/browserconfig.xml'
                ],
                output: process.env.DEST,
                options: {
                    nodir: true
                }
            },
            {
                input: [
                    process.env.SRC + '/resources/**',
                    '!**/sprite/**', // Don't include generator files
                    '!**/svg-sprite/**',  // Don't include generator files
                    '!**/*.scss',  // Don't include generator files
                    '!**/*.md',  // Don't include generator files
                    '!**/*.twig',  // Don't include generator files
                ],
                output: process.env.DEST + '/resources',
                options: {
                    nodir: true
                }
            },
            {
                input: [
                    process.env.VENDOR_PATH + '/**',
                    '!' + process.env.VENDOR_PATH + '/**/src/**',  // Don't include package source dev file
                    '!' + process.env.VENDOR_PATH + '/bourbon/**'  // Don't include preprocessor libraries
                ],
                output: process.env.DEST + '/resources/main/javascripts/lib',
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