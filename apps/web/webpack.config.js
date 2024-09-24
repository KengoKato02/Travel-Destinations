import { stringify } from 'safe-stable-stringify';

const path = require('node:path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './app.js',
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
      template: './index.html',
      filename: 'index.html'
    }),
    /* eslint-disable n/no-process-env */
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': stringify(
        process.env.API_BASE_URL || 'http://localhost:3000/api'
      )
    })
    /* eslint-enable n/no-process-env */
  ],
  devServer: {
    static: './dist',
    port: 8080
  },
  mode: 'development'
};
