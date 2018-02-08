var path = require('path')
var config = require('../config')
var utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack")

module.exports = {
    entry: {
        app: path.resolve(__dirname, '../src/index.js'),
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            // 外部依赖可以 通过一些配置 提升性能
            // vue2.0 import vue 时，需要配置引入哪个js，否则默认引入vue.common.js
            'vue$': 'vue/dist/vue.esm.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
            'page': path.resolve(__dirname, '../src/page'),
            'vui': path.resolve(__dirname, '../../vui'),
            'container': path.resolve(__dirname, '../src/container'),
            'jquery': 'jquery'
        }
    },
    plugins: [
        //  配置全局使用 jquery
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    module: {
        // 外部依赖可以 通过一些配置 提升性能
        noParse: function (content) {
            //防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制。忽略大型的 library 可以提高构建性能。
            return /jquery|lodash/.test(content);
        },
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                        options: vueLoaderConfig
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: utils.assetsPath('images/[name].[hash:7].[ext]')
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10000,
                            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                        }
                    }
                ]
            },
            {
                test: /^\.scss$/,
                loader: ['style', 'css', 'sass']
            }
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}
