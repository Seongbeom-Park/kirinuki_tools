const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        alias: {
            '@effect': path.resolve(__dirname, 'src/effect'),
            '@resource': path.resolve(__dirname, 'src/resource')
        }
    },
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: false
        })
    ],
    module: {
        rules: [
            {
                test: /\.webm$/,
                use: 'file-loader'
            }
        ]
    }
};