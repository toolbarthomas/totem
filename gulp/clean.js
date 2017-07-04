module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        return NODE_MODULES.del([PATHS.dest]);
    }
}