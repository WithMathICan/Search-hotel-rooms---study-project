const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'
console.log(isProd ? 'This is production version' : 'This is development version')

const cssOptions = [
    { loader: MiniCssExtractPlugin.loader },
    { loader: 'css-loader', options: { sourceMap: true } },
    {
        loader: 'postcss-loader',
        options: { postcssOptions: { plugins: [['autoprefixer']] }, sourceMap: true },
    },
]
const scssOptions = [...cssOptions, { loader: 'sass-loader', options: { sourceMap: true } }]

const config = {
    entry: {
        'form-elements': './src/form-elements.js',
        colors: './src/colors.js'
    },
    output: {
        filename: isProd ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
        path: __dirname + '/dist',
        publicPath:  ''
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.scss$/,
                use: scssOptions
            },
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                type: 'asset/resource' 
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: isProd ? '[name].[contenthash].css' : '[name].css' }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/[name].pug',
            filename: '[name].html',
            // inject: false
        }),
        // new HtmlWebpackPlugin({
        //     template: 'src/form-elements.pug',
        //     filename: 'form-elements.html',
        //     inject: false,
        //     // publicPath : 'dist'
        //     // templateParameters: (compilation, assets, assetTags, options) => {
        //     //     console.log("--------------------------------------------------");
        //     //     console.log(compilation, assets, assetTags, options);
        //     //     console.log("--------------------------------------------------");
        //     //     console.log(compilation, assets, assetTags, options);
        //     //     console.log("--------------------------------------------------");
        //     //     console.log(compilation, assets, assetTags, options);
        //     //     console.log("--------------------------------------------------");
        //     //     console.log(compilation, assets, assetTags, options);
        //     //     console.log("--------------------------------------------------");
        //     //     return {
        //     //         compilation,
        //     //         webpackConfig: compilation.options,
        //     //         htmlWebpackPlugin: {
        //     //             tags: assetTags,
        //     //             files: {
        //     //                 js : ['form-elements.js'],
        //     //                 css : ['form-elements.css']
        //     //             },
        //     //             options
        //     //         },
        //     //         'foo': 'bar'
        //     //     };
        //     // },
        // })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
        client: {
            reconnect: true,
        },
        hot: true,
        watchFiles: {
            paths: ['src/**/*', 'dist/**/*'],
            options: {
                usePolling: false,
            },
        },
        historyApiFallback: true,
    },
}

module.exports = config