const { src, dest, watch, parallel } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
function scripts() {
  return src("src/js/main.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("src/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("src/sass/style.scss")
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}

function watching() {
  watch(["src/sass/style.scss"], styles);
  watch(["src/js/main.js"], scripts);
  watch(["src/*.html"]).on("change", browserSync.reload);
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(styles, scripts, browsersync, watching);
