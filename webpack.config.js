const { resolve } = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const autoprefixer = require('autoprefixer')

const DEBUG = process.env.NODE_ENV !== 'production'
const HASH = !DEBUG ? '-[hash]' : ''
const CHUNKHASH = !DEBUG ? '-[chunkhash]' : ''
const PUBLICPATH = addSlash(process.env.PUBLICPATH || (DEBUG ? '/' : '/geo'))

const plugins = [
  new webpack.LoaderOptionsPlugin({
    debug: !!DEBUG,
    minimize: !DEBUG
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new CopyWebpackPlugin([{ from: resolve(__dirname, 'app/waypoints.json') }]),
  new MiniCssExtractPlugin({
    filename: `[name]${CHUNKHASH}.css`,
    chunkFilename: `[id]${CHUNKHASH}.css`
  }),
  new StaticSiteGeneratorPlugin({
    entry: 'main',
    paths: ['/'],
    globals: {
      // shimming 'window' as self, to make webpack-dev-server/client happy.
      self: {
        location: {},
        postMessage: () => {},
        addEventListener: () => {}
      }
    }
  })
]

const cssLoaders = [
  // always using MiniCssExtractPlugin.loader even in debug mode, because
  // style-loader in combination with static-site-generator-webpack-plugin
  // gives a "window is not defined" error.
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      // don't localize names by default, otherwise bootstrap get
      // localized too. Instead explicitly :local(...) what needs to be.
      // ?importLoaders=1 seems not required for now.
      // https://css-tricks.com/css-modules-part-3-react/
      // https://github.com/css-modules/css-modules
      modules: 'global',
      localIdentName: '[local]_[hash:base64:5]'
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        autoprefixer()
      ]
    }
  }
]

module.exports = {
  mode: DEBUG ? 'development' : 'production',
  context: __dirname,
  entry: {
    main: [
      'core-js/modules/es6.promise',
      './app/main.js' // must be last for static-site-generator-webpack-plugin
    ]
  },
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: PUBLICPATH,
    filename: `[name]${CHUNKHASH}.js`,
    chunkFilename: `[name]${CHUNKHASH}-chunk.js`,
    libraryTarget: 'umd',
    pathinfo: !!DEBUG,
    // errr, a "temp" hack for a "window is not defined" error we get in
    // static-site-generator-webpack-plugin with webpack 4
    // https://github.com/markdalgleish/static-site-generator-webpack-plugin/issues/130
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  devtool: DEBUG ? 'cheap-module-eval-source-map' : 'source-map',
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
        use: cssLoaders
      },
      {
        test: /\.(svg|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `[name]${HASH}.[ext]`
            }
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

function addSlash (s) {
  if (!s || !s.length) {
    return '/'
  }
  if (s[s.length - 1] === '/') {
    return s
  }
  return `${s}/`
}
