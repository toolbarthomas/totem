module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        // Prevent syncing development files
        var sync_ignores = [
            '!' + process.env.TOTEM_SRC + '/resources/**/sprite/**',
            '!' + process.env.TOTEM_SRC + '/resources/**/svg-sprite/**',
            '!' + process.env.TOTEM_SRC + '/resources/modules/**/javascripts/**',
            '!' + process.env.TOTEM_SRC + '/resources/groups/**/javascripts/**',
            '!' + process.env.TOTEM_SRC + '/resources/templates/**/javascripts/**',
            '!' + process.env.TOTEM_SRC + '/resources/**.{scss,md,twig,html}',
            '!' + process.env.TOTEM_SRC + '/resources/**/data.json'
        ];

        var sources = [
            {
                input: [
                    process.env.TOTEM_SRC + '/browserconfig.xml'
                ],
                output: process.env.TOTEM_DEST,
                options: {
                    nodir: true
                }
            },
            {
                input: [
                    process.env.TOTEM_SRC + '/resources/**',
                ].concat(sync_ignores),
                output: process.env.TOTEM_DEST + '/resources',
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