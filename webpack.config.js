var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname,'./src/index.js'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'./dist')
    },
    // 解析模块请求的选项
    resolve: {
        // 使用的扩展名
        extensions: [".js", ".jsx", ".css", '.less'],

        // 配置路径
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['react','env']
                    }
                }
            },
            {
                test:/\.(css|less)$/,
                exclude: /node_modules/,
                use:['style-loader','css-loader','postcss-loader','less-loader']
            }
        ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.tpl.html',
            inject:'body',
            filename: 'index.html'
        }),

        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        port:8083,
        hot: true,
        contentBase:'./dist'
    }
}