module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {

        // Define all module locations in a globbing pattern (including your external packages: bower, NPM etc.)
        var sources = [
            process.env.SRC + '/resources/modules/*/javascripts/*.js',
            process.env.MODULES_PATH + '/totem.module.*/javascripts/*.js'
        ];

        //Setup an empty bunddle were Browserify does its magic.
        var bundle = [];

        //Define a stream we can return to complete our task
        var streams = [];

        // Start index;
        var source_index = 0;

        let setGlob = new Promise((resolve, reject) => {
            for (var index = 0; index < sources.length; index++) {
                NODE_MODULES.glob(sources[source_index], function (error, file) {
                    if (error) {
                        return;
                    }

                    //Add the found files to our bunddle
                    bundle = bundle.concat(file);

                    source_index++;

                    if (source_index == sources.length) {
                        resolve("Make bundle!");
                    }
                });
            }
        });

        return setGlob.then((message) => {
            for (var index = 0; index < bundle.length; index++) {
                var basename = NODE_MODULES.path.basename(bundle[index]);
                var ext = NODE_MODULES.path.extname(basename);
                var name = NODE_MODULES.path.basename(bundle[index], ext);
                var destination = bundle[index].replace(process.env.SRC, process.env.DEST);

                var queue = NODE_MODULES.browserify({
                    entries: bundle[index],
                    standalone: NODE_MODULES.camelCase(name)
                }).bundle()
                    .pipe(NODE_MODULES.vinylSourceStream(basename))
                    .pipe(PLUGINS.derequire())
                    .pipe(GULP.dest(process.env.DEST + '/resources/modules/' + name + '/javascripts'));

                streams.push(queue);

                if (index == (bundle.length - 1)) {
                    return NODE_MODULES.merge(streams);
                }
            }
        });
    }
}