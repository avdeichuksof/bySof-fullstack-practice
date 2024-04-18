const dotenv = require('dotenv')
dotenv.config()
// const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        static: {
            directory: __dirname + 'dist',
        },
        compress: true,
        port: 3001,
        proxy: {
            '/': 'http://localhost:8080'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            
        }),
        new webpack.DefinePlugin({
            'process.env.MONGO_URL': JSON.stringify(process.env.MONGO_URL),
            'process.env.PORT': JSON.stringify(process.env.PORT),
            'process.env.SECRET': JSON.stringify(process.env.SECRET),
            'process.env.REACT_APP_BASE_URL': JSON.stringify(process.env.REACT_APP_BASE_URL),
            'process.env.REACT_APP_PAYMENT_ENDPOINT': JSON.stringify(process.env.REACT_APP_PAYMENT_ENDPOINT),
        }),
    ]
}