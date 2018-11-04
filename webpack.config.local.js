const path = require('path');

const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.config.base.js');


module.exports = function(env) {
    return webpackMerge(baseConfig, {
        output: {
            path: path.resolve(__dirname, '../qd-front/static/2123/jsqd'),
            filename: '[name].js'
        },
        devtool: 'source-map',
    });
};
