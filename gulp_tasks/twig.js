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
                    process.env.MODULES_PATH + '/totem.module.*/**/*.twig',
                    '!**/totem.module.*/**/bower_components/**/*.twig'
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
            .pipe(PLUGINS.data(function (file) {
                var data = 'data.json';

                var path = NODE_MODULES.path.relative(file.cwd, file.path);
                var extension = NODE_MODULES.path.basename(path);

                var data = path.replace(extension, 'data.json');

                // Check if data.json exists
                if (!NODE_MODULES.fse.existsSync(data)) {
                    return {};
                }
                return JSON.parse(NODE_MODULES.fse.readFileSync(data));
            }))
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