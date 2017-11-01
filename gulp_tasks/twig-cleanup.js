module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback) {

        // Cleanip external twig files by removing them from the temporary directory
        // Define our temporary directory
        const tmp_dir = process.env.SRC + '/resources/tmp';

        // Abort if we have no submodules_path
        if (!process.env.SUBMODULES_PATH) {
            PLUGINS.util.log('The .env variable: SUBMODULES_PATH is not defined, prepare task won\'t continue.');
            return;
        }

        // Abort
        if (!NODE_MODULES.fse.existsSync(tmp_dir)) {
            PLUGINS.util.log(tmp_dir + ' doesn\'t exists, twig cleanup is not necessary.');
            return;
        }

        //Remove all Twig files withn our tmp_dir
        return NODE_MODULES.del([
            tmp_dir + '/**',
            '!' + tmp_dir
        ]);
    }
}