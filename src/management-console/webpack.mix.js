const webpackExtension = require('./webpack.extenstion')
const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const base = mix
    .ts('resources/js/app.ts', 'public/js')
    .sass('resources/styles/app.scss', 'public/css')
    .webpackConfig(webpackExtension)
    .copy('resources/images', 'public/images')


if (mix.inProduction()) {
    // develop mode で version を利用すると hot reload が効かないため
    // @see https://stackoverflow.com/questions/54569883/laravel-mix-hmr-not-updating-after-compiling
    base.version()
} else {
    base.sourceMaps()
}
