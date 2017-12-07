module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        // Define the properties for each category
        var sources = [
            {
                input: [
                    process.env.TOTEM_SRC + '/resources/main/stylesheets/*.scss'
                ],
                output: process.env.TOTEM_DEST + '/resources/main/stylesheets',
                ignore_folders: []
            },
            {
                input: [
                    process.env.TOTEM_SRC + '/resources/modules/*/stylesheets/*.scss',
                    process.env.TOTEM_SUBMODULES + '/totem.module.*/stylesheets/*.scss',
                    // '!' + process.env.TOTEM_SUBMODULES + '/totem.module.tipi*/**' //Prevent seperate module builds for Tipi based packages
                ],
                output: process.env.TOTEM_DEST + '/resources/modules',
                ignore_folders: [
                    'totem_submodules',
                    'node_modules',
                    'bower_components'
                ]
            },
            {
                input: [
                    process.env.TOTEM_SRC + '/resources/groups/*/stylesheets/*.scss',
                    process.env.TOTEM_SUBMODULES + '/totem.group.*/stylesheets/*.scss'
                ],
                output: process.env.TOTEM_DEST + '/resources/groups',
                ignore_folders: []
            },
            {
                input: [
                    process.env.TOTEM_SRC + '/resources/templates/*/stylesheets/*.scss',
                    process.env.TOTEM_SUBMODULES + '/totem.template.*/stylesheets/*.scss',
                ],
                output: process.env.TOTEM_DEST + '/resources/templates',
                ignore_folders: []
            }
        ];

        var streams = [];

        sources.forEach(function (source) {

            //Remove the specified MODULES_PATH from the .env file. so only import our Modules once.
            var ignore_paths = source.ignore_folders;
            ignore_paths = ignore_paths.filter(function (item) {
                return item !== process.env.TOTEM_SUBMODULES
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
                .pipe(PLUGINS.autoprefixer())
                .pipe(PLUGINS.sourcemaps.write('./'))
                .pipe(GULP.dest(source.output))

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams).pipe(PLUGINS.livereload({
            quiet: true
        }));
    }
}