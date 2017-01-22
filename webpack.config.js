const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const debug = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        'login': './ui-app/login/login-view.js',
        'game': './ui-app/game/game-view.js',
        'game-master': './ui-app/game-master/game-master-view.js',
    },
    output: {
        path: path.resolve(__dirname, 'ui-dist'),
        filename: '[name].js'
    },
    devtool: debug ? 'source-map' : false,
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: [
                    path.resolve(__dirname, 'ui-app'),
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.styl?$/,
                include: [
                    path.resolve(__dirname, 'ui-app'),
                ],
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    'stylus-loader',
                ]
            },
            {
                test: /\.otf?$/,
                include: [
                    path.resolve(__dirname, 'ui-app'),
                ],
                use: [
                    'file-loader',
                ]
            },
            {
                test: /\.png?$/,
                include: [
                    path.resolve(__dirname, 'ui-app'),
                ],
                use: [
                    'file-loader?name=[name].[ext]',
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'common': path.resolve(__dirname, 'ui-app/common'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'login.html',
            template: 'ui-app/login/login.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            filename: 'game.html',
            template: 'ui-app/game/game.html',
            chunks: ['game']
        }),
        new HtmlWebpackPlugin({
            filename: 'game-master.html',
            template: 'ui-app/game-master/game-master.html',
            chunks: ['game-master']
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'ui-dist'),
        compress: true,
        port: 8082,
        host: '0.0.0.0'
    }
};
