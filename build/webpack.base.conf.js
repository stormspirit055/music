const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: resolve('src/main.js'),
  output: {
    path: resolve('dist'),
    filename: '[name]_[hash].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('src/index.html')
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.scss', '.jsx', '.css'],
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
        test: /\.css$/i,
        //style-loader 将生成的css 内容挂载到页面的head部分
        //css-loader 分析出css 文件的关系, 并合并成一段css
        use: ['style-loader', 'css-loader']
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
              name: 'images/[name]_[hash].[ext]'
            }
          }
        ]
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
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory=true', //开启缓存, 将转译结果缓存至系统文件
        exclude: /node_modules/
      },
     ]
   }
}