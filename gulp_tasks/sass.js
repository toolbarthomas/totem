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
                ignore_folders: [
                    'git_submodules',
                    'node_modules',
                ]
            },
            {
                input: [
                    process.env.SRC + '/resources/pages/*/stylesheets/*.scss'
                ],
                output: process.env.DEST + '/resources/pages',
                ignore_folders: [
                    'git_submodules',
                    'node_modules',
                    'bower_components'
                ]
            },
            {
                input: [
                    process.env.SRC + '/resources/templates/*/stylesheets/*.scss'
                ],
                output: process.env.DEST + '/resources/templates',
                ignore_folders: [
                    'git_submodules',
                    'node_modules',
                    'bower_components'
                ]
            }
        ];

        var streams = [];

        sources.forEach(function (source) {

            //Remove the specified MODULES_PATH from the .env file. so only import our Modules once.
            var ignore_paths = source.ignore_folders;
            ignore_paths = ignore_paths.filter(function (item) {
                return item !== process.env.MODULES_PATH
            });

            // Make a globbing path from each ignore path
            for (var index = 0; index < ignore_paths.length; index++) {
                ignore_paths[index] = '**/' + ignore_paths[index] + '/**';                
            }

            var stream = GULP.src(source.input)
                .pipe(PLUGINS.sourcemaps.init())
                .pipe(PLUGINS.sassGlob({
                    ignorePaths: ignore_paths
                }))
                .pipe(PLUGINS.sass().on('error', PLUGINS.sass.logError))
                .pipe(PLUGINS.sourcemaps.write('./'))
                .pipe(GULP.dest(source.output))

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}