module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {

        var sources = [
            process.env.SRC + '/resources/modules/*/javascripts/*.js'
        ];

        var bundle = [];
        var streams = [];

        function makeBundle() {
            console.log(bundle);

            for (var index = 0; index < bundle.length; index++) {
                var basename = NODE_MODULES.path.basename(bundle[index]);
                var ext = NODE_MODULES.path.extname(basename);
                var name = NODE_MODULES.path.basename(bundle[index], ext);

                var destination = bundle[index].replace(process.env.SRC, process.env.DEST);

                var queue = NODE_MODULES.browserify({
                    entries: basename,
                    standalone: name
                }).bundle()
                .pipe(NODE_MODULES.vinylSourceStream(basename))
                .pipe(PLUGINS.derequire())
                .pipe(GULP.dest(destination));

                streams.push(queue);
            }

            return NODE_MODULES.merge(streams);
        }


        for (var index = 0; index < sources.length; index++) {
            NODE_MODULES.glob(sources[index], function (error, file) {
                if (error) {
                    return;
                }

                bundle = bundle.concat(file);


                if(index == sources.length) {
                    makeBundle();
                }
            });
        }
    }
}