const path = require('path');

const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.config.base.js');


module.exports = function(env) {
    return webpackMerge(baseConfig, {
        output: {
            path: path.resolve(__dirname, 'dist-prod'),
            filename: '[name].js'
        },
        devtool: 'nosources-source-map',
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            })
        ],
    });
};
