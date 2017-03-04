const { resolve } = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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
  new CopyWebpackPlugin([
    { from: resolve(__dirname, 'app/waypoints.json') }
  ]),
  new ExtractTextPlugin(`[name]${CHUNKHASH}.css`),
  new StaticSiteGeneratorPlugin({
    entry: 'main',
    paths: ['/'],
    globals: {
      // shimming 'window' as self, to make webpack-dev-server/client happy.
      // also add setImmediate to keep setImmediate.js at bay ...
      self: {
        location: {},
        postMessage: () => {},
        setImmediate: global.setImmediate
      }
    }
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

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      // don't localize names by default, otherwise bootstrap get
      // localized too. Instead explicitly :local(...) what needs to be.
      // ?importLoaders=1 seems not required for now.
      // https://css-tricks.com/css-modules-part-3-react/
      // https://github.com/css-modules/css-modules
      modules: false,
      localIdentName: '[local]_[hash:base64:5]'
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        autoprefixer({
          browsers: [
            'last 3 versions',
            '> 1%'
          ]
        })
      ]
    }
  }
]

module.exports = {
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
    pathinfo: !!DEBUG
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoaders
        })
      },
      {
        test: /\.svg$/,
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
