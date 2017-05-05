'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require(path.resolve(__dirname, '../package.json'))
const { extractor } = require('./webpack.vars')
module.exports = {
  entry: path.resolve(__dirname, '../src/main'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'leaflet-css': path.join(__dirname, '../node_modules/leaflet/dist/leaflet.css')
     }
  },
  devtool: '#source-map',
  module: {
     rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|cozy-(bar|client-js))/,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        use: 'json'
      },
      {
        test: /\.css$/,
        use: extractor.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg)$/,
        use: "file-loader?name=images/[name].[ext]"
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use:"file-loader"
      }
    ]
  },
  plugins: [
    extractor,
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: pkg.name
    })
  ]
}
