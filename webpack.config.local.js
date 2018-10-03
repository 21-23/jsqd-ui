const path = require('path');

const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.config.base.js');


module.exports = function(env) {
    return webpackMerge(baseConfig, {
        output: {
            path: path.resolve(__dirname, '../front-end-service/static/jsqd'),
            filename: '[name].js'
        },
        devtool: 'source-map',
    });
};
