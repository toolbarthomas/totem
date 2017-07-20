module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        return PLUGINS.connect.server({
            root: PATHS.dest,
            livereload: true
        });

    }
}