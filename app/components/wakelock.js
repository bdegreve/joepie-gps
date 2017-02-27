/* global screen */

import React from 'react'

// hacky support
// this is still in draft: https://w3c.github.io/wake-lock/
// other sources: https://whatwebcando.today/wake-lock.html

export default class extends React.Component {
  componentDidMount () {
    // https://w3c.github.io/wake-lock/
    if (typeof navigator !== 'undefined' && navigator.getWakeLock !== undefined) {
      if (process.env.NODE_ENV !== 'production') {
        console.console('-- navigator.getWakeLock')
      }
      navigator.getWakeLock('system').then(wakeLock => {
        if (process.env.NODE_ENV !== 'production') {
          console.console('-- wakeLock.createRequest')
        }
        this._request = wakeLock.createRequest()
      })
    }

    // https://developer.mozilla.org/en-US/docs/Mozilla/B2G_OS/API/Wake_Lock_API
    if (typeof navigator !== 'undefined' && navigator.requestWakeLock !== undefined) {
      if (process.env.NODE_ENV !== 'production') {
        console.console('-- navigator.requestWakeLock')
      }
      this._lock = navigator.requestWakeLock('gps')
    }

    // https://whatwebcando.today/wake-lock.html
    if (typeof screen !== 'undefined' && screen.keepAwake !== undefined) {
      if (process.env.NODE_ENV !== 'production') {
        console.console('-- screen.keepAwake')
      }
      screen.keepAwake = true
    }
  }

  componentWillUnmount () {
    if (this._request) {
      this._request.cancel()
    }

    if (this._lock) {
      this._lock.unlock()
    }

    if (typeof screen !== 'undefined' && screen.keepAwake !== undefined) {
      screen.keepAwake = false
    }
  }

  render () {
    return React.Children.only(this.props.children)
  }
}
