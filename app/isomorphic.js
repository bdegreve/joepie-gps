import React from 'react'
import ReactDOMServer from 'react-dom/server'

export default (Component, {title}) =>
  (locals, callback) => {
    // locals.assets only contain javascript assets. we want all of them!
    const assets = getAssetPaths(locals.webpackStats, 'main') // same main as in webpack.config.js' entry
    const scripts = assets.filter(asset => /\.jsx?$/.test(asset))
    const stylesheets = assets.filter(asset => /\.css$/.test(asset))

    const root = ReactDOMServer.renderToString(
      <Component location={locals.path} />
    )

    const html = ReactDOMServer.renderToStaticMarkup(
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>{title}</title>
          {React.Children.map(stylesheets, (asset) => (
            <link rel='stylesheet' type='text/css' href={asset} />
          ))}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: root}} />
          {React.Children.map(scripts, (asset) => (
            <script type='text/javascript' src={asset} />
          ))}
        </body>
      </html>
    )

    return callback(null, `<!DOCTYPE html>\n${html}`)
  }

function getAssetPaths (webpackStats, chunkName) {
  const stats = webpackStats.toJson({
    chunks: false,
    modules: false,
    source: false,
    errorDetails: false,
    timings: false
  })
  const assets = chunkName
    ? stats.assetsByChunkName[chunkName]
    : stats.assets.map((asset) => asset.name)
  let publicPath = stats.publicPath
  if (publicPath.length && !publicPath.endsWith('/')) {
    publicPath += '/'
  }
  return assets.map(asset => `${publicPath}${asset}`)
}
