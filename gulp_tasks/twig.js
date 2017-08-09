module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, IGNORE_PATHS, REVISION) => {
    return function (callback) {
        var sources = [
            {
                input: [
                    PATHS.src + '/resources/pages/**/*.twig'
                ],
                output: PATHS.dest + '/resources/pages'
            },
            {
                input: [
                    PATHS.src + '/resources/modules/**/*.twig',
                    './bower_components/totem.module.*/**/*.twig',
                    './git_submodules/totem.module.*/**/*.twig',
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