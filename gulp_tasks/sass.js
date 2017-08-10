module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        // Define the properties for each category
        var sources = [
            {
                input: [
                    process.env.SRC + '/resources/modules/*/stylesheets/*.scss',
                    process.env.MODULES_PATH + '/totem.module.*/stylesheets/*.scss',
                ],
                output: process.env.DEST + '/resources/modules',
            },
            {
                input: [
                    process.env.SRC + '/resources/pages/*/stylesheets/*.scss'
                ],
                output: process.env.DEST + '/resources/pages',
            },
            {
                input: [
                    process.env.SRC + '/resources/templates/*/stylesheets/*.scss'
                ],
                output: process.env.DEST + '/resources/templates',
            }
        ];

        var streams = [];

        // Ignore all package manager folders when using git_modules for development
        var sass_globbing_ignore_paths = [
            '**/git_submodules/**',
            '**/node_modules/**',
            '**/bower_components/**'
        ];

        switch (process.env.MODULES_PATH) {
            case 'git_submodules':
                sass_globbing_ignore_paths.splice(0, 1);
                break;
            case 'node_modules':
                sass_globbing_ignore_paths.splice(1, 1);
                break;
            default:
                sass_globbing_ignore_paths.splice(2, 1);
                break;
        }

        sources.forEach(function (source) {
            var stream = GULP.src(source.input)
                .pipe(PLUGINS.sourcemaps.init())
                .pipe(PLUGINS.sassGlob({
                    ignorePaths: sass_globbing_ignore_paths
                }))
                .pipe(PLUGINS.sass().on('error', PLUGINS.sass.logError))
                .pipe(PLUGINS.sourcemaps.write('./'))
                .pipe(GULP.dest(source.output))

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}