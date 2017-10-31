module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        // Prevent syncing development files
        var sync_ignores = [
            '!**/sprite/**',
            '!**/svg-sprite/**',
            '!**/*{.scss,.md,.twig}',
        ];

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
                ].concat(sync_ignores),
                output: process.env.DEST + '/resources',
                options: {
                    nodir: true
                }
            },
            {
                input: [
                    process.env.VENDOR_PATH + '/svg-sprite-injector/**',
                ],
                output: process.env.DEST + '/resources/main/javascripts/lib/svg-sprite-injector',
                options: {
                    nodir: true
                }
            },
            {
                input: [
                    process.env.VENDOR_PATH + '/jquery/**',
                    '!' + process.env.VENDOR_PATH + '/**/src/**'  // Don't include package source dev file
                ],
                output: process.env.DEST + '/resources/main/javascripts/lib/jquery',
                options: {
                    nodir: true
                }
            }
        ];

        var streams = [];

        sources.forEach(function(source) {
            var stream = GULP.src(source.input, source.options)
                .pipe(PLUGINS.filter(function (file) {
                    return file.stat && file.contents.length;
                }))
                .pipe(GULP.dest(source.output));

            streams.push(stream);
        });

        return NODE_MODULES.merge(streams);
    }
}