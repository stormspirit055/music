const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin() 
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        //style-loader 将生成的css 内容挂载到页面的head部分
        //css-loader 分析出css 文件的关系, 并合并成一段css
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
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