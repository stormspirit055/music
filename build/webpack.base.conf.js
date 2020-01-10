const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: resolve('src/main.js'),
  output: {
    path: resolve('dist'),
    //将打包后分割的js文件统一输出到dist/js 目录下
    filename: '[name]_[hash].bundle.js',
    chunkFilename: '[name].js'
  },

  plugins: [
    // new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/index.html')
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    //过滤moment其他语言包 打包体积缩小200kb
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-cn/,
    ),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.scss', '.css'],
    alias: { 
      'vue': 'vue/dist/vue.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
    }
  },
  optimization: {
    // 将公共依赖单独提取出来
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        xgplayer: {
          test: /xgplayer/,
          priority: 0,
          name: 'xgplayer'
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    }
  },
   module: {
     rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('src')],
        exclude: /node_modules\/(?!(autotrack|dom-utils))|vendor\.dll\.js/ // 添加配置
      },
      {
        // 正则匹配所有以.png,jpg,gif结尾的文件
        test: /\.(png|jpg|gif|jpeg|eot|woff|ttf)$/,
        // 使用url-loader对图片进行处理
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              //将图片资源打包到一个文件中, 并重新命名
              name: '[name]_[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true', //开启缓存, 将转译结果缓存至系统文件
        exclude: /node_modules/
      },
     ]
   }
}