var gulp = require("gulp"),
    less = require("gulp-less"),
    bower = require("./bower.json"),
    cssmin = require("gulp-cssmin"),
    connect = require("gulp-connect"),
    filter = require("gulp-filter"),
    del = require("del"),
    uglify = require("gulp-uglifyjs"),
    rename = require("gulp-rename"),
    formatter = require("gulp-prettify"),
    run = require("run-sequence"),
    noblank = require("gulp-remove-empty-lines");

gulp.task("css", function() {
    return gulp.src("src/less/*.less")
        .pipe(less())
        .pipe(gulp.dest("dist/css"))
        .pipe(cssmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("copy", function() {
    return gulp.src("bower/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task("default", ["clean"], function() {
    return gulp.start(["copy","css","html","js","watch","server"]);
});

gulp.task("js", function() {
    gulp.src("src/js/*.js")
        .pipe(gulp.dest("dist/js"))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js"));
});

gulp.task("html", function() {
    return gulp.src("src/html/*.html")
        .pipe(formatter({
            indent_size: 2
        }))
        .pipe(noblank())
        .pipe(gulp.dest("app"));
});

gulp.task("lint", function() {
    return gulp.src("src/html/*.html")
        .pipe(formatter({
            indent_size: 2
        }))
        .pipe(noblank())
        .pipe(gulp.dest("src/html"));
});

gulp.task("clean", function(callback) {
    del([
        "dist/**/*"
    ], callback)
});

gulp.task("dist:js", function() {
    return gulp.src("bower/bootstrap/dist/js/bootstrap*js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task("dist:less", function() {
    return gulp.src("src/less/**/*.less")
        .pipe(gulp.dest("dist/less"));
});

gulp.task("dist", function() {
    run(['dist:js', 'dist:less', 'dist:zip'], function() {
        del([
            "dist/js/bootstrap*js",
            "dist/less"
        ]);
    });
});

gulp.task("server", function() {
    return connect.server({
        root: "app"
    });
});

gulp.task("watch", function() {
    gulp.watch("src/less/**/*.less", ["css"]);
    gulp.watch("src/js/**/*.js", ["js"]);
    gulp.watch("src/html/**/*.html", ["html"]);
});
