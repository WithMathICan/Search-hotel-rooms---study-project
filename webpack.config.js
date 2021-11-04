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
    entry: isProd ? './src/script-prod.js' : './src/script-dev.js',
    output: {
        filename: 'bundle.js',
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
        new MiniCssExtractPlugin({ filename: 'main.css' }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/colors.pug',
            filename: 'colors.html',
            // hash : isProd
            // inject: false
        }),
        new HtmlWebpackPlugin({
            template: 'src/form-elements.pug',
            filename: 'form-elemets.html',
        })
    ],
    devServer: {
        static: { 
            directory: path.join(__dirname, 'public'),
        },
        compress: false,
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