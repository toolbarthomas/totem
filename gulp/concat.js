module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        return GULP.src([
            PATHS.src + '/assets/js/components/**/*.js',
            PATHS.packages + '/*totem*/**/*.js'
        ])
        .pipe(PLUGINS.sourcemaps.init())
        .pipe(PLUGINS.concat('totem.js'))
        .pipe(PLUGINS.sourcemaps.write('./'))
        .pipe(GULP.dest(PATHS.dest + '/assets/js/lib/totem/'))
        .pipe(PLUGINS.connect.reload());
    }
}