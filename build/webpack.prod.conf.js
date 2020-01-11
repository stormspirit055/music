const merge = require('webpack-merge')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const prodWebpackConfig = merge(baseWebpackConfig, {
  //加上mode:production webpack 会自动压缩代码
  mode: 'production',
  externals:{
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
  },
  module: {
    rules: [
      // 自己编写一个loader, 打包时,将baseurl换成线上地址
      {
        test: /request.js$/,
        use: [resolve('build/loaders/baseurlLoader.js')]
      },
      {
        test: /\.css$/i,
        //style-loader 将生成的css 内容挂载到页面的head部分, 用MiniCssExtractPlugin.loader 代替style-loader 用于css代码分割 
        //css-loader 分析出css 文件的关系, 并合并成一段css
        use: [MiniCssExtractPlugin.loader, 'css-loader']
        // use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
          {
            loader: "sass-resources-loader",
            options: {
              resources: [ 
                resolve("src/style/variables.scss"),
                resolve( "src/style/mixin.scss")
              ]
            }
          }
        ],
      },
    ]
  },
  optimization: {
    //css代码压缩 
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  plugins: [
    new MiniCssExtractPlugin({
      chunkFilename: '[name]_[hash:8].css',
      filename: '[name]_[hash:8].css'
    }),
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
    // 打包分析
    // new BundleAnalyzerPlugin(
    //   {
    //     analyzerMode: 'server',
    //     analyzerHost: '127.0.0.1',
    //     analyzerPort: 8888,
    //     reportFilename: 'report.html',
    //     defaultSizes: 'parsed',
    //     openAnalyzer: true,
    //     generateStatsFile: false,
    //     statsFilename: 'stats.json',
    //     statsOptions: null,
    //     logLevel: 'info'
    //   }
    // ),
  ],
})
module.exports = prodWebpackConfig