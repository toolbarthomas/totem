module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {

        // Iterate between each type of component withing the project.
        var sources = [
            {
                input: [
                    process.env.TOTEM_SRC + '/resources/groups/**/*.twig',
                    process.env.TOTEM_SUBMODULES + '/totem.group*/**/*.twig',
                    '!' + process.env.TOTEM_SUBMODULES + '/**/node_modules/**/*.twig'
                ],
                output: process.env.TOTEM_DEST + '/resources/groups'
            },
            {
                input: [
                    process.env.TOTEM_SRC + '/resources/modules/**/*.twig',
                    process.env.TOTEM_SUBMODULES + '/totem.module*/**/*.twig',
                    '!' + process.env.TOTEM_SUBMODULES + '/**/node_modules/**/*.twig',
                    '!' + process.env.TOTEM_SRC + '/resources/modules/**/partials/**/*.twig',
                    '!' + process.env.TOTEM_SUBMODULES + '/totem.module*/**/partials/**/*.twig',
                ],
                output: process.env.TOTEM_DEST + '/resources/modules'
            }
        ];

        // Define the global json file so can share data between multiple pages
        var global_json = {
            path: process.cwd() + '/data.json',
            data: {}
        };

        var data = {};

        // Insert the data from the global data.json file within our json.data
        if (NODE_MODULES.fse.existsSync(global_json.path)) {
            data = JSON.parse(NODE_MODULES.fse.readFileSync(global_json.path));
        }

        // Setup the streams where we push each Gulp instance
        // And return the whole object all together
        var streams = [];

        // // Tmp cache location for json streams
        // var tap_cache;

        // Iterate trough each source so we can transform all twig sources
        // Return each iterated object into the stream.
        sources.forEach(function(source) {
            // Abort if we have no inout within our source
            if (source.input === 0) {
                return;
            }

            var stream = GULP.src(source.input, {
                nodir: true
            })
            .pipe(PLUGINS.plumber())
            // .pipe(PLUGINS.tap(function(file) {
            //     var path = NODE_MODULES.path.parse(NODE_MODULES.path.relative(file.cwd, file.path));

            //     var json = {
            //         path: path.dir + 'data.json',
            //         data: false
            //     };


            //     // Check if there is a data.json file within the current directory of the current file
            //     // Try to find the json file within the parent directory if can't find it within the original path
            //     if (!NODE_MODULES.fse.existsSync(json.path)) {
            //         // Update json path to the parent path
            //         json.path = path.dir + '/../' + 'data.json';

            //         if (NODE_MODULES.fse.existsSync(json.path)) {
            //             json.data = true;
            //         }
            //     }

            //     // Abort if we have no data
            //     if (!json.data) {
            //         return;
            //     }

            //     var array = JSON.parse(NODE_MODULES.fse.readFileSync(json.path));

            //     if (typeof array != 'object') {
            //         return;
            //     }

            //     // Filter out empty arrays
            //     if(array.length == 0) {
            //         return;
            //     }

            //     console.log(typeof data);
            //     console.log(typeof array);


            //     for (var key in array) {
            //         // Skip undefined keys
            //         if(key == null) {
            //             continue;
            //         }

            //         if (data.hasOwnProperty(key)) {
            //             continue;
            //         }

            //         data = Object.assign(data, array[key]);
            //     }
            // }))
            .pipe(PLUGINS.data(function(file) {
                return data;
            }))
            .pipe(PLUGINS.twig({
                base: './',
                namespaces: {
                    'totem_submodules': NODE_MODULES.path.normalize(process.env.TOTEM_SUBMODULES) + '/',
                    'totem': '../' + (process.cwd()).substring((process.cwd()).lastIndexOf("/") + 1) + '/'
                },
                onError: function(error) {
                    if(!error) {
                        return;
                    }
                }
            }))
            .pipe(PLUGINS.faker())
            .pipe(GULP.dest(source.output));

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}