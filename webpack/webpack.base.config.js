const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const commonConfig = {
  entry: {
    app: [path.join(__dirname, '../src/index.tsx')]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory=true', 'eslint-loader'],
        include: path.join(__dirname, '../src')
      },
      {
        test: /\.tsx?$/,
        loader: [
          'babel-loader?cacheDirectory=true',
          'awesome-typescript-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|eot)$/,
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
        test: /\.glsl$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NO_INTL: JSON.stringify(process.env.npm_config_nointl ? '1' : '0')
      }
    }),

    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|zh-cn/),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: path.join(__dirname, '../src/assets/images/favicon.png'),
      template: path.join(__dirname, '../src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, '../src/assets/antd'), to: 'antd' },
      { from: path.join(__dirname, '../src/assets/textures'), to: 'textures' }
    ]),
    new StyleLintPlugin({
      context: 'src',
      files: '**/*.less',
      syntax: 'less'
    })
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  }
}

if (process.env.npm_config_report) {
  commonConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = commonConfig
