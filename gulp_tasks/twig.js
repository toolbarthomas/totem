module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        var sources = [
            {
                input: [
                    process.env.SRC + '/resources/pages/**/*.twig'
                ],
                output: process.env.DEST + '/resources/pages'
            },
            {
                input: [
                    process.env.SRC + '/resources/modules/**/*.twig',
                    './bower_components/totem.module.*/**/*.twig',
                    './git_submodules/totem.module.*/**/*.twig',
                ],
                output: process.env.DEST + '/resources/modules'
            }
        ];

        var streams = [];

        sources.forEach(function(source) {
            var stream = GULP.src(source.input, {
                nodir: true
            })
            .pipe(PLUGINS.plumber())
            .pipe(PLUGINS.twig({
                base: process.env.SRC + '/resources',
                errorLogToConsole: true
            }))
            .pipe(PLUGINS.faker())
            .pipe(GULP.dest(source.output));

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}