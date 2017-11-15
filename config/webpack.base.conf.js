const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
    return path.resolve()
}

const APP_DIR = path.resolve(__dirname, '../src')

const config = {
    entry: APP_DIR + '/index.js',
    output: {
        path: path.resolve(__dirname, '../build/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                exclude: /node_modules/,
                include: [APP_DIR]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                include: [APP_DIR],
                query: {
                    presets: ['react','env','stage-3','stage-0']
                }
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                include: [APP_DIR],
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader?-autoprefixer', 'stylus-loader']
                })
            },
            /*{
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: [path.join(__dirname, '../node_modules/antd'), path.join(__dirname, '../src/assets/')]
            },*/
            {
                test: /.css$/, 
                loaders: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
};

module.exports = config