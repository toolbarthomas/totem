module.exports = (GULP, PLUGINS, NODE_MODULES, REVISION) => {
    return function (callback)
    {
        return NODE_MODULES.del([process.env.TOTEM_DEST]);
    }
}