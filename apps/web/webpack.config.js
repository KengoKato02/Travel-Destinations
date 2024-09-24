const path = require('node:path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true // Clean the output directory before each build
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript
          options: {
            presets: ['@babel/preset-env'] // Preset for modern JavaScript
          }
        }
      },
      {
        test: /\.css$/, // Apply this rule to .css files
        use: ['style-loader', 'css-loader'] // Loaders to handle CSS files
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Template HTML file
      filename: 'index.html' // Output HTML file
    })
  ],
  devServer: {
    static: './dist', // Serve files from the dist directory
    port: 8080 // Port for the dev server
  },
  mode: 'development'
};
