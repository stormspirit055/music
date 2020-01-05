const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  // devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin() 
  ],
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
  resolve: {
    extensions: ['.js', '.vue', '.scss', '.jsx', '.css'],
    alias: { 
      'vue': 'vue/dist/vue.js',
      '@': path.resolve(__dirname, 'src/'),
      'assets': path.resolve(__dirname, 'src/assets'),
    }
  },
   module: {
     rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // { test: /\.(eot|woff|ttf)$/, loader: 'file-loader' },
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
              limit: 8192
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
                path.resolve(__dirname, "src/style/variables.scss"),
                path.resolve(__dirname, "src/style/mixin.scss")
              ]
            }
          }
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
     ]
   }
}