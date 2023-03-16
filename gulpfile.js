const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");

function scripts() {
  return src(["src/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("src/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("src/sass/*.scss")
    .pipe(autoprefixer({ overrideBrowserslist: ["last 10 version"] }))
    .pipe(concat("style.min.css"))
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}

// смотритель
function watching() {
  watch(["src/sass/**/*.scss"], styles);
  watch(["src/js/main.js"], scripts);
  watch(["src/*.html"]).on("change", browserSync.reload);
}

// лайв папку src
function browsersync() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
}

// удаление dist
function cleanDist() {
  return src("dist").pipe(clean());
}

// добавление в дист только минифицированные файлы
function building() {
  return src(["src/css/style.min.css", "src/js/main.min.js", "src/**/*.html"], {
    base: "src",
  }).pipe(dest("dist"));
}

// экспорты
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;

// сперва выполняется чистка, потом буилд
exports.build = series(cleanDist, building);
// параллельно включаются задачи
exports.default = parallel(styles, scripts, browsersync, watching);
