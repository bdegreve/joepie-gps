const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DEBUG = process.env.NODE_ENV !== 'production'
const HASH = !DEBUG ? '-[hash]' : ''
const CHUNKHASH = !DEBUG ? '-[chunkhash]' : ''
const PUBLICPATH = process.env.PUBLICPATH || '/'

const plugins = [
  new webpack.LoaderOptionsPlugin({
    debug: !!DEBUG,
    minimize: !DEBUG
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest']
  }),
  new HtmlWebpackPlugin({
    template: resolve(__dirname, 'app/index.html')
  })
]
if (!DEBUG) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false // too many warnings are worse than none.
      }
    })
  )
}

module.exports = {
  context: __dirname,
  entry: {
    main: [
      './app/main.js' // must be last for static-site-generator-webpack-plugin
    ],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom'
    ]
  },
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: PUBLICPATH,
    filename: `[name]${HASH}.js`,
    chunkFilename: `[name]${CHUNKHASH}-chunk.js`,
    libraryTarget: 'umd',
    pathinfo: !!DEBUG
  },
  devtool: DEBUG ? 'cheap-eval-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        enforce: 'pre',
        use: 'standard-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader' // see .babelrc
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  plugins,
  resolve: {
    modules: [
      resolve(__dirname, 'app'),
      __dirname,
      'node_modules',
      'web_modules' // because https://github.com/webpack/webpack-dev-server/issues/60
    ]
  }
}
