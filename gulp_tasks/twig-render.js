module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {

        // Iterate between each type of component withing the project.
        var sources = [
            {
                input: [
                    process.env.SRC + '/resources/groups/*/*.twig',
                    process.env.SRC + '/resources/groups/*/pages/**/*.twig',
                    '!' + process.env.SRC + '/resources/groups/*/partials/**/*.twig'
                ],
                output: process.env.DEST + '/resources/groups'
            },
            {
                input: [
                    process.env.SRC + '/resources/modules/**/*.twig',
                    process.env.SUBMODULES_PATH + '/totem.module.*/**/*.twig',
                    '!' + process.env.SRC + '/**/{node_modules,bower_components}/**/*.twig',
                    '!' + process.env.SUBMODULES_PATH + '/**/{node_modules,bower_components}/**/*.twig',
                    '!' + process.env.SRC + '/resources/modules/**/partials/**/*.twig',
                    '!' + process.env.SUBMODULES_PATH + '/totem.module.*/**/partials/**/*.twig',
                ],
                output: process.env.DEST + '/resources/modules'
            }
        ];

        // Define the global json file so can share data between multiple pages
        var global_json = {
            path: process.env.SRC + '/data.json',
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
            .pipe(PLUGINS.data(function(file) {

                // Define the json file
                var name = 'data.json';
                var path = NODE_MODULES.path.parse(NODE_MODULES.path.relative(file.cwd, file.path));

                // Define if we have an json file within our page
                var json = {
                    path: path.dir + '/' + name,
                    data: false
                };


                // Check if we have a data json file within the same directory of the current file
                if(!NODE_MODULES.fse.existsSync(json.path)) {
                    // Change the current json path to it's parent
                    // So we can check if our parent directory has an json file.
                    json.path = path.dir + '/../' + name;

                    // Check if our parent directory has a data json
                    if (NODE_MODULES.fse.existsSync(json.path)) {
                        json.data = true;
                    }
                } else {
                    json.data = true;
                }

                // Return the json object if we have one
                // Or Return an empty object if no json file has been found
                if(json.data) {
                    data = Object.assign(data, JSON.parse(NODE_MODULES.fse.readFileSync(json.path)));
                }

                return data;
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