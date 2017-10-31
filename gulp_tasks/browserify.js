// Bundle each javascript module with Browserify
// This script will fetch all main files for each module and will generate an ES6 compatible module with

module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {

        // Define all module locations in a globbing pattern (including your external packages: bower, NPM etc.)
        var data = [
            {
                'path': process.env.SRC + '/resources/modules/*/javascripts/*.js',
                'type': 'module'
            },
            {
                'path': process.env.SUBMODULES_PATH + '/totem.module.*/javascripts/*.js',
                'type': 'module'
            },
            {
                'path': process.env.SRC + '/resources/groups/*/javascripts/*.js',
                'type': 'group'
            },
            {
                'path': process.env.SRC + '/resources/templates/*/javascripts/*.js',
                'type': 'template'
            }
        ];

        var streams = [];

        var processed = 0;

        // Iterate trough all types and iterate over it
        data.forEach(function (source) {
            return NODE_MODULES.globby(source.path).then(files => {
                processed++;

                for (var index = 0; index < files.length; index++) {
                    var stats = NODE_MODULES.fse.statSync(files[index]);

                    var basename = NODE_MODULES.path.basename(files[index]);
                    var ext = NODE_MODULES.path.extname(basename);
                    var name = NODE_MODULES.path.basename(files[index], ext);

                    if (stats.size === 0) {
                        PLUGINS.util.log(NODE_MODULES.chalk.yellow(name + ext + ' is empty, this file will be ignored.'))
                        continue;
                    }

                    PLUGINS.util.log(NODE_MODULES.chalk.yellow(name + ext + ' is not empty'))

                    var subfolder = '';
                    switch (source.type) {
                        case 'template':
                            subfolder = '/resources/templates/';
                            break;
                        case 'group':
                            subfolder = '/resources/groups/';
                            break;
                        default:
                            subfolder = '/resources/modules/';
                            break;
                    }

                    var stream = NODE_MODULES.browserify({
                        entries: files[index],
                        standalone: NODE_MODULES.camelCase(name)
                    }).transform(NODE_MODULES.babelify).bundle()
                    .pipe(NODE_MODULES.vinylSourceStream(basename))
                    .pipe(PLUGINS.derequire())
                    .pipe(GULP.dest(process.env.DEST + subfolder + name + '/javascripts'));

                    streams.push(stream);
                }

                if(processed == data.length) {
                    return NODE_MODULES.merge(streams);
                }
            });
        });
    }
}