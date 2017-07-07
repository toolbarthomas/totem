module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        var objects = GULP.src([
            PATHS.src + '/resources/objects/**/javascripts/**/*.js',
            PATHS.packages + '/totem.object.*/**/javascripts/**/*.js'
        ], {
            no_dir: true,
            base: '.'
        })
        .pipe(PLUGINS.sourcemaps.init())
        .pipe(PLUGINS.concat('objects.bundle.js'))
        .pipe(PLUGINS.sourcemaps.write('./'))
        .pipe(GULP.dest(PATHS.dest + '/resources/base/javascripts/'));

        var components = GULP.src([
            PATHS.src + '/resources/components/**/javascripts/**/*.js',
            PATHS.packages + '/totem.component.*/**/javascripts/**/*.js'
        ], {
            no_dir: true,
            base: '.'
        })
        .pipe(PLUGINS.sourcemaps.init())
        .pipe(PLUGINS.concat('components.bundle.js'))
        .pipe(PLUGINS.sourcemaps.write('./'))
        .pipe(GULP.dest(PATHS.dest + '/resources/base/javascripts/'));

        return NODE_MODULES.merge(objects, components);
    }
}