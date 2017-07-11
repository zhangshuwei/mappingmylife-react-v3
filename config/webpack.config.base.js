'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const pkg = require(path.resolve(__dirname, '../package.json'))
const { extractor } = require('./webpack.vars')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/main'),
    vendor: ['moment', 'vis/dist/vis.min.js']
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      'leaflet-css': path.join(__dirname, '../node_modules/leaflet/dist/leaflet.css'),
      'bootstrap-css': path.join(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.min.css'),
      'bootstrap-theme-css': path.join(__dirname, '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css'),
      'font-awesome-css': path.join(__dirname, '../node_modules/font-awesome/css/font-awesome.min.css'),
      'ionicons-css': path.join(__dirname, '../node_modules/ionicons/dist/css/ionicons.min.css')
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
        use: 'json-loader'
      },
      {
        test: /\.css$/,
        use: extractor.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg)$/,
        use: 'file-loader?name=images/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    extractor,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: pkg.name
    }),
    new webpack.ProvidePlugin({
      'cozy.client': 'cozy-client-js/dist/cozy-client.js',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
    new BundleAnalyzerPlugin()
  ]
}
