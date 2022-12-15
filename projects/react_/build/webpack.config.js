const path = require('path')
const htmlPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    path: path.join(process.cwd(), 'dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@utils': path.resolve(__dirname, '../src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/,
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
    new htmlPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
  ],
  devServer: {
    hot: true,
    port: 3002,
    historyApiFallback: true,
  }
}
