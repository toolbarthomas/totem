module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, IGNORE_PATHS, REVISION) => {
    return function (callback)
    {
        var sources = [
            {
                input: [
                    PATHS.src + '/resources/modules/**/javascripts/**/*.js'
                ],
                output: PATHS.dest + '/resources/main/javascripts/modules',
                file_name: 'modules.bundle.js'
            }
        ];

        var streams = [];
        sources.forEach(function (source) {
            var stream = GULP.src(source.input, {
                nodir: true,
                base: '.'
            })
            .pipe(PLUGINS.sourcemaps.init())
            .pipe(PLUGINS.concat(source.file_name))
            .pipe(PLUGINS.sourcemaps.write('./'))
            .pipe(GULP.dest(source.output));

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}