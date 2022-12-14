const path = require('path')
const htmlPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')

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
    new htmlPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, '../public/three.js-dev/examples'),
    //       to: path.resolve(__dirname, './dist/public')
    //     }
    //   ]
    // })
  ],
  devServer: {
    hot: true,
    port: 3001,
    historyApiFallback: true,
    static: {
      //指定我们的public文件夹为静态资源目录
      directory: path.join(__dirname, '../public'),
      //指定我们要通过/public访问到directory设置的静态资源
      //（这个很重要如果不设置默认是通过 / 访问directory设置的静态资源，会和默认访问index.html冲突）
      // publicPath: '/demos'
    }
  }
}
