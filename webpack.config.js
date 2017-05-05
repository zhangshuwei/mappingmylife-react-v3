'use strict'

const merge = require('webpack-merge')

module.exports = merge(
  require('./config/webpack.config.base'),
  require('./config/webpack.config.copy-files')
)
