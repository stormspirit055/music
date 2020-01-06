const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin() 
  ],
  optimization: {
    // 过滤没有用到的引入包
    usedExports: true
  },
  devServer: {
    proxy: {
      '/netease-api': {
        target: 'http://47.98.146.129:3000/',
        pathRewrite: { '^/netease-api': '' },
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
module.exports = devWebpackConfig