module.exports = (GULP, PLUGINS, NODE_MODULES, PATHS, REVISION) => {
    return function (callback)
    {
        var base = gulp.src([
            PATHS.src + '/components/**/*.md'
        ])
        gulp.src('docs/*.md')
        .pipe(markdownDocs('index.html', {
        ... options ...
        }))
        .pipe(gulp.dest('./documentation/'));
    }
}