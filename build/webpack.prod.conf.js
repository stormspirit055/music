const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const prodWebpackConfig = merge(baseWebpackConfig, {
  //加上mode:production webpack 会自动压缩代码
  mode: 'production',
  externals:{
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
  },
  plugins: [
    // gzip 服务端也能进行压缩, 但是如果客户端直接把压缩好的gzip文件传到服务端 可以节省服务端在收到请求后对文件进行的压缩的性能损耗
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.js(\?.*)?$/i,
      threshold: 10240,
      minRatio: 0.8
    }),
    // 压缩代码
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS:{
        output: {
          comments: false
        },
        warnings: false,
        compress: {
          drop_debugger: true, // 去除生产环境的 debugger 和 console.log
          drop_console: true
        }
      }
    }),
  ],
})
module.exports = prodWebpackConfig