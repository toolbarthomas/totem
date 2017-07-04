module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback) {
        var sources = [
            PATHS.src,
            PATHS.packages
        ];

        var streams = [];

        sources.forEach(function(source) {
            NODE_MODULES.del([source + '/**/scss/**/*.html']).then(function() {
                var stream = GULP.src([
                    source + '/**/scss/**/*.twig',
                ], {
                    nodir: true
                })
                .pipe(PLUGINS.twig())
                .pipe(PLUGINS.faker())
                .pipe(GULP.dest(source));

                streams.push(stream);
            });
        }, this);

        return NODE_MODULES.merge(streams).pipe(PLUGINS.run('./node_modules/.bin/kss --c ./styleguide.json').exec());
    }
}