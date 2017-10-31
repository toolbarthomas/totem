// Bundle each javascript module with Browserify
// This script will fetch all main files for each module and will generate an ES6 compatible module with

module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {

        // Define all module locations in a globbing pattern (including your external packages: bower, NPM etc.)
        var sources = [
            {
                input: [
                    process.env.SRC + '/resources/modules/*/javascripts/*.js',
                    process.env.SUBMODULES_PATH + '/totem.module.*/javascripts/*.js'
                ],
                output: process.env.DEST + '/resources/modules',
            },
            {
                input: [
                    process.env.SRC + '/resources/groups/*/javascripts/*.js'
                ],
                output: process.env.DEST + '/resources/groups',
            },
            {
                input: [
                    process.env.SRC + '/resources/templates/*/javascripts/*.js'
                ],
                output: process.env.DEST + '/resources/templates',
            }
        ];

        var streams = [];

        sources.forEach(function(source) {
            var stream = GULP.src(source.input)
            .pipe(PLUGINS.filter(function (file) {
                return file.stat && file.contents.length;
            }))
            .pipe(PLUGINS.tap(function (file) {
                var basename = NODE_MODULES.path.basename(file.path);
                var ext = NODE_MODULES.path.extname(basename);
                var name = NODE_MODULES.path.basename(file.path, ext);

                PLUGINS.util.log(NODE_MODULES.chalk.yellow('Bundling file: ' + name + ext));

                // replace file contents with browserify's bundle stream
                file.contents = NODE_MODULES.browserify(file.path, {
                    debug: true,
                    standalone: NODE_MODULES.camelCase(name)
                }).bundle();
            }))
            .pipe(PLUGINS.buffer())            // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
            .pipe(PLUGINS.sourcemaps.init({ loadMaps: true })) //load and init sourcemaps
            .pipe(PLUGINS.sourcemaps.write('./'))
            .pipe(GULP.dest(source.output));

            streams.push(stream);
        }, this);

        return NODE_MODULES.merge(streams);
    }
}