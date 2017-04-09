const path = require('path');

const WebpackNotifierPlugin = require('webpack-notifier');

const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.config.base.js');


module.exports = function(env) {
    return webpackMerge(baseConfig, {
        devtool: 'source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 8082,
            host: '0.0.0.0'
        },
        plugins: [
            new WebpackNotifierPlugin(),
        ]
    });
};
