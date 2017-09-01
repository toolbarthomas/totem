module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        return PLUGINS.connect.server({
            root: process.env.DEST,
            livereload: true
        });
    }
}