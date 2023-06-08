// Está armazenando o pacote que foi instalado no src, dest, watch e parallel.
const { src, dest, watch, parallel } = require("gulp");

// Está fazendo a requisição das dependências do package.json.
const sass = require("gulp-sass")(require("sass"));
const browserify = require("browserify");
const babelify = require("babelify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const uglify = require("gulp-uglify");
const connect = require("gulp-connect");
const imagemin = require("gulp-imagemin");

// Objeto responsável por armazenar os diretórios principais.
const paths = {
    html: {
        all: "./src/templates/**/*.html",
    },
    styles: {
        all: "./src/styles/**/*.scss",
        main: "./src/styles/partials/main.scss",
    },
    scripts: {
        all: "./src/scripts/**/*.js",
        main: "./src/scripts/app.js",
    },
    images: {
        all: "./src/assets/**",
    },
    output: "./dist",
};

// Responsável por fazer a hospedagem local.
function server() {
    connect.server({
        root: paths.output,
        livereload: true,
        port: 3000,
    });
}

// Responsável por monitorar modificações nos arquivos.
function sentinel() {
    watch(paths.html.all, { ignoreInitial: false }, html);
    watch(paths.styles.all, { ignoreInitial: false }, styles);
    watch(paths.scripts.all, { ignoreInitial: false }, scripts);
    watch(paths.images.all, { ignoreInitial: false }, images);
}

// Responsável por gerar o arquivo HTML.
function html() {
    return src(paths.html.all).pipe(dest(paths.output));
}

// Responsável por gerar o arquivo CSS.
function styles() {
    return src(paths.styles.main)
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(dest(paths.output))
        .pipe(connect.reload());
}

// Responsável por gerar o aquivo JS.
function scripts() {
    return browserify(paths.scripts.main)
        .transform(
            babelify.configure({
                presets: ["@babel/preset-env"],
            })
        )

        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(dest(paths.output))
        .pipe(connect.reload());
}

// Responsável por automatizar as imagens.
function images() {
    return src(paths.images.all).pipe(imagemin()).pipe(dest(paths.output));
}

// Está criando um export chamado default que é responsável por disparar duas funções ao mesmo tempo.
exports.default = parallel(server, sentinel); // Usado para hospedagem local, monitoramento de modificação e otimização de arquivos.
exports.build = parallel(html, styles, scripts, images) // Usado somente para criar a pasta build com os arquivos otimizados.

