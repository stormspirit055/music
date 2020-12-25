const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: resolve('src/main.js'),
  output: {
    path: resolve('dist'),
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
          name: 'vendors',
          minChunks: 10
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