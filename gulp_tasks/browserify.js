// Bundle each javascript module with Browserify
// This script will fetch all main files for each module and will generate an ES6 compatible module with

module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {

        // Define all module locations in a globbing pattern (including your external packages: bower, NPM etc.)
        var sources = [
            process.env.SRC + '/resources/modules/*/javascripts/*.js',
            process.env.SUBMODULES_PATH + '/totem.module.*/javascripts/*.js'
        ];

        //Define a stream we can return to complete our task
        var streams = [];

        return NODE_MODULES.globby(sources).then(files => {
            for (var index = 0; index < files.length; index++) {

                var stats = NODE_MODULES.fse.statSync(files[index]);

                var basename = NODE_MODULES.path.basename(files[index]);
                var ext = NODE_MODULES.path.extname(basename);
                var name = NODE_MODULES.path.basename(files[index], ext);

                if (stats.size === 0) {
                    PLUGINS.util.log(NODE_MODULES.chalk.yellow(name + ext + ' is empty, this file will be ignored.'))
                    break;
                }

                var queue = NODE_MODULES.browserify({
                    entries: files[index],
                    standalone: NODE_MODULES.camelCase(name)
                }).transform(NODE_MODULES.babelify).bundle()
                    .pipe(NODE_MODULES.vinylSourceStream(basename))
                    .pipe(PLUGINS.derequire())
                    .pipe(GULP.dest(process.env.DEST + '/resources/modules/' + name + '/javascripts'));

                streams.push(queue);
            }

            return NODE_MODULES.merge(streams);
        });
    }
}