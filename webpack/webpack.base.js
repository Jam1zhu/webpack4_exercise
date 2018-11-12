/**
 * Created by ZLY on 2018/11/7.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const IS_PRD_ENV = process.env.NODE_ENV === 'production'
let {publicPath, resolvePath} = require('./util')

publicPath = IS_PRD_ENV ? publicPath : '/'
module.exports = {
    entry: {
        vendors: resolvePath('src/vendors.js'),
        app: resolvePath('src/app.js')
    },
    output: {
        path: resolvePath('dist'),
        filename: "js/[name].[chunkhash].js",
        publicPath,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: ['babel-loader']
            }, {
                test: /\.(sa|sc|c)ss$/,
                // exclude: '/node_modules/',
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/style/'
                        }
                    },
                    {loader: 'css-loader', options: {importLoaders: 1}},
                    'postcss-loader',
                    "sass-loader"
                ]
            }, {
                test: /\.(eot|svg|ttf|woff)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        /**
                         * 跟图片配置一样，但输出不一样，why？？？
                         * 字体文件，配置outputPath不起作用
                         */
                        limit: 1,
                        // outputPath:'icon',
                        name: 'icon/[name].[hash].[ext]',
                        publicPath,
                        // useRelativePath: true,
                    }
                }
            }, {
                test: /\.(jpg|gif|png|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // outputPath:'images',
                        limit: 1,
                        name: 'images/[name].[hash].[ext]',
                        publicPath,
                        // useRelativePath: true,
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'style/' + (IS_PRD_ENV ? '[name].[hash].css' : '[name].css'),
        }),
        new HtmlWebpackPlugin({
            template: resolvePath('src/template/index.html'),
            filename: 'index.html',
            chunk: ['vendors', 'app']
        })
    ],
    optimization: {
        minimizer: (function () {
            let arr = []
            if (IS_PRD_ENV) {
                arr.push(new UglifyJsPlugin)
            }
            arr.push(new OptimizeCSSAssetsPlugin)
            return arr
        })()
    },
    resolve: {
        // 别名，简写路径
        alias: {
            // 各类非 js 直接引用（import require）静态资源，依赖相对路径加载问题，都可以用 ~ 语法完美解决；
            'images': resolvePath('src/asset/images')
        }
    },
    externals: {
        // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
        // 引入外部扩展，可以理解为，引用全局变量
        jquery: 'jQuery'
    }
}