module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {

        // Define all module locations in a globbing pattern (including your external packages: bower, NPM etc.)
        var sources = [
            // process.env.SRC + '/resources/modules/*/javascripts/*.js',
            process.env.MODULES_PATH + '/totem.module.*/javascripts/*.js'
        ];

        //Setup an empty bunddle were Browserify does its magic.
        var bundle = [];

        //Define a stream we can return to complete our task
        var streams = [];

        //Callback function to generate a seperate module
        function makeBundle() {
            for (var index = 0; index < bundle.length; index++) {
                var basename = NODE_MODULES.path.basename(bundle[index]);
                var ext = NODE_MODULES.path.extname(basename);
                var name = NODE_MODULES.path.basename(bundle[index], ext);

                var destination = bundle[index].replace(process.env.SRC, process.env.DEST);

                var queue = NODE_MODULES.browserify({
                    entries: basename,
                    standalone: NODE_MODULES.camelCase(name)
                }).bundle()
                .pipe(NODE_MODULES.vinylSourceStream(basename))
                .pipe(PLUGINS.derequire())
                .pipe(GULP.dest(process.env.DEST + '/resources/modules/' + name + '/javascripts'));

                streams.push(queue);
            }

            return NODE_MODULES.merge(streams);
        }

        //Setup our bundle with our defined sources:
        for (var index = 0; index < sources.length; index++) {
            NODE_MODULES.glob(sources[index], function (error, file) {
                if (error) {
                    return;
                }

                //Add the found files to our bunddle
                bundle = bundle.concat(file);

                //Callback
                if(index == sources.length) {
                    makeBundle();
                }
            });
        }
    }
}