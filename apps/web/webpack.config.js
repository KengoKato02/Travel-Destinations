const path = require('node:path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const stringify = require('safe-stable-stringify');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/javascript/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/html/index.html',
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        template: './src/html/new-destination.html',
        filename: 'new-destination.html'
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/icons', to: 'icons' }]
      }),
      new webpack.DefinePlugin({
        'process.env.API_URL': stringify(
          isProduction
            ? 'https://travel-destinations-api.vercel.app/api'
            : 'http://localhost:3000/api'
        )
      })
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/'
      },
      compress: true,
      port: 8080,
      hot: true,
      historyApiFallback: true,
      devMiddleware: {
        writeToDisk: true
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization'
      }
    },
    mode: isProduction ? 'production' : 'development'
  };
};
