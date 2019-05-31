const merge = require('webpack-merge')
const path = require('path')
const commonConfig = require('./webpack.base.config')

const devConfig = {
  devtool: 'inline-source-map',
  entry: {
    app: ['react-hot-loader/patch', path.join(__dirname, '../src/index.tsx')]
  },
  output: {
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 8089,
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true,
    host: 'localhost',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://apistore.hobot.cc/mock/209',
        secure: false,
        changeOrigin: true
      }
    }
  }
}

module.exports = merge({
  customizeArray(a, b, key) {
    if (key === 'entry.app') {
      return b
    }
    return undefined
  }
})(commonConfig, devConfig)
