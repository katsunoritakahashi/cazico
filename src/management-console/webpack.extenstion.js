const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    plugins: [new VuetifyLoaderPlugin()],

    resolve: {
        extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx'],
        alias: {
            '@': resolve('resources/js'),
            '@styles': resolve('resources/styles'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: { appendTsSuffixTo: [/\.vue$/] },
                exclude: /node_modules/,
            },
        ],
    },
    devServer: {
        proxy: {
            '*': 'http://localhost:8000'
        }
    }
}

function resolve(dir) {
    return path.join(__dirname, dir)
}
