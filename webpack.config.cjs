const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    mode: mode,
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })],

    devtool: 'source-map',

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        watchFiles: ['src/**/*.html']
    }
}

