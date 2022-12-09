const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/] // 要处理 vue 文件中的 ts 代码
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset',
        parser: {
          // 生成Data URI 的条件
          dataUrlCondition: {
            // 当资源模块不超过 4kb 时，生成 DataURI，超过 4kb 时，单独打包成文件
            maxSize: 4 * 1024 // 4b
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new htmlPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
  ],
  devServer: {
    hot: true,
    port: 3003,
    historyApiFallback: true,
  }
}
