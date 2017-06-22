var path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    extractStyle = new ExtractTextPlugin('css/style.css'),
    extractVendor = new ExtractTextPlugin('css/vendor.css'),
    OpenBrowserPlugin = require('open-browser-webpack-plugin'),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: process.env.NODE_ENV === 'production' ? './webpack.entry' : [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './webpack.entry.js'
    ],
    output: {
        filename: 'js/[name]_bundle.js',
        chunkFilename: "js/[name]_chunk.js",
        path: path.resolve(__dirname, './build'),
        publicPath: process.env.NODE_ENV === 'production' ? './' : ''
    },
    context: __dirname,
    module: {
        rules: [{
            test: /\.scss$/,
            use: process.env.NODE_ENV === 'production' ? extractStyle.extract({ fallback: "style-loader", use: ["css-loader?minimize=true", "sass-loader"] }) : ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
        }, {
            test: /\.css$/,
            use: process.env.NODE_ENV === 'production' ? extractStyle.extract({ fallback: "style-loader", use: ["css-loader?minimize=true"] }) : ['style-loader', 'css-loader?sourceMap']
        }, {
            test: /\.(jpg|png)$/,
            use: [
                'url-loader?limit=1000&name=img/[name].[ext]'
            ]
        }, {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: {
                    interpolate: 'require'
                }
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        extractStyle,
        extractVendor,
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'VERSION': JSON.stringify('1')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin({
            banner: 'This is created by chenqingwei'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "chunk", 
        //     filename: "js/chunk.js",
        //     minChunks: Infinity
        // })
    ] : [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'VERSION': JSON.stringify('1')
        }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080/' })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        hot: true,
        noInfo: false
    },
    devtool: 'source-map',
    externals: {
        zepto: 'Zepto'
    },
    resolve: {
        extensions: ['.js', '.scss', '.html']
    }
}
