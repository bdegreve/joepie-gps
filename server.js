const { resolve } = require('path')
const url = require('url')
const express = require('express')
const proxy = require('express-http-proxy')

const HOST = '0.0.0.0'
const PORT = process.env.PORT || 8080

var app = express()

app.use('/assets/sw.js', (req, res, next) => {
  res.set('Service-Worker-Allowed', '/')
  next()
})

app.use('/assets', express.static(resolve(__dirname, 'dist/assets')))

app.get('/home', proxy(`http://localhost:${PORT}`, {
  forwardPath: (_) => '/assets/index.html'
}))

app.listen(PORT, HOST, () => {
  console.log(`Listening at http://${HOST}:${PORT}`)
})