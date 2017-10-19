module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {
        var sources = [
            {
                input: [
                    process.env.SRC + '/resources/groups/*/*.twig',
                    process.env.SRC + '/resources/groups/*/pages/**/*.twig'
                ],
                output: process.env.DEST + '/resources/groups'
            },
            {
                input: [
                    process.env.SRC + '/resources/modules/**/*.twig', // Project Modules
                    process.env.SUBMODULES_PATH + '/totem.module.*/**/*.twig', // External Modules,
                    '!**/totem.module.*/**/bower_components/**', // Can remove if no package has bower
                    '!**/partials/**',
                    '!**/totem.module.tipi/**'
                ],
                output: process.env.DEST + '/resources/modules'
            }
        ];

        var streams = [];

        // Json file we can use to define global values within the project.
        var global_json = {};
        var data = process.env.SRC + '/data.json';
        if (NODE_MODULES.fse.existsSync(data)) {
            global_json = JSON.parse(NODE_MODULES.fse.readFileSync(data));
        }

        sources.forEach(function(source) {
            var stream = GULP.src(source.input, {
                nodir: true
            })
            .pipe(PLUGINS.plumber())
            .pipe(PLUGINS.data(function (file) {
                var data = 'data.json';

                var path = NODE_MODULES.path.relative(file.cwd, file.path);
                var extension = NODE_MODULES.path.basename(path);

                var f = path.replace(extension, 'data.json');

                // Check if data.json exists
                if (!NODE_MODULES.fse.existsSync(f)) {
                    return {};
                }

                return Object.assign(global_json, JSON.parse(NODE_MODULES.fse.readFileSync(f)));
            }))
            .pipe(PLUGINS.twig({
                base: process.env.SRC + '/resources'
            }))
            .pipe(PLUGINS.faker())
            .pipe(GULP.dest(source.output));

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}