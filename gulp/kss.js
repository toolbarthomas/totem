module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback) {
        return PLUGINS.run('./node_modules/.bin/kss --c ./styleguide.json').exec();
    }
}