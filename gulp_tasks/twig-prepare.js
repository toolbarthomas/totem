module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {

        // Prepare external twig files by moving them to a temporary directory
        // Define our temporary directory
        const tmp_dir = process.env.SRC + '/resources/tmp';

        // Abort if we have no submodules_path
        if (!process.env.SUBMODULES_PATH) {
            PLUGINS.util.log('The .env variable: SUBMODULES_PATH is not defined, prepare task won\'t continue.' );
            return;
        }

        if (process.env.SUBMODULES_PATH == tmp_dir) {
            PLUGINS.util.log('The .env variable: SUBMODULES_PATH is the same as: `' + process.env.SRC + ' /resources/tmp` prepare task won\'t continue.');
            return;
        }


        if (NODE_MODULES.fse.existsSync(tmp_dir)) {
            if (!NODE_MODULES.fse.readdirSync(tmp_dir)) {
                PLUGINS.util.log('The path defined .env variable: SUBMODULES_PATH is not empty.');
                PLUGINS.util.log('Twig prepare won\'t continue; please ensure this path is empty');
                return;
            }
        }

        var stream = GULP.src([
            process.env.SUBMODULES_PATH + '/**/*.{twig,json}',
        ])
        .pipe(PLUGINS.filter(function (file) {
            return file.stat && file.contents.length;
        }))
        .pipe(GULP.dest(tmp_dir));

        return stream;
    }
}