/* global screen */

import React from 'react'
import NoSleep from 'nosleep'

// hacky support
// this is still in draft: https://w3c.github.io/wake-lock/
//
// let's try a few other things too ...

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      method: ''
    }

    this.onClick = this.onClick.bind(this)
  }
  componentDidMount () {
    // "official" way: https://w3c.github.io/wake-lock/
    if (typeof navigator !== 'undefined' && navigator.getWakeLock !== undefined) {
      navigator.getWakeLock('system').then(wakeLock => {
        this._request = wakeLock.createRequest()
        this.setState({method: 'navigator.getWakeLock ok'})
      })
      this.setState({method: 'navigator.getWakeLock'})
      return
    }

    // firefox OS thing: https://developer.mozilla.org/en-US/docs/Mozilla/B2G_OS/API/Wake_Lock_API
    if (typeof navigator !== 'undefined' && navigator.requestWakeLock !== undefined) {
      this._lock = navigator.requestWakeLock('gps')
      this.setState({method: 'navigator.requestWakeLock'})
      return
    }

    // never implemented? https://www.sitepoint.com/3-new-javascript-apis-may-want-follow/
    if (typeof navigator !== 'undefined' && navigator.wakeLock !== undefined) {
      navigator.wakeLock.request('screen')
        .then(() => {
          this.setState({method: 'navigator.wakeLock ok'})
          this._hasWakeLock = true
        })
      this.setState({method: 'navigator.wakeLock'})
      return
    }

    // https://whatwebcando.today/wake-lock.html
    if (typeof screen !== 'undefined' && screen.keepAwake !== undefined) {
      screen.keepAwake = true
      this.setState({method: 'screen.keepAwake'})
      return
    }

    // oh shit, nothing works, let's do this other thing then ...
    if (typeof document !== 'undefined') {
      this._noSleep = new NoSleep()
      this.setState({method: 'NoSleep.js'})
      return
    }
  }

  componentWillUnmount () {
    if (this._request) {
      this._request.cancel()
    }

    if (this._lock) {
      this._lock.unlock()
    }

    if (this._hasWakeLock) {
      navigator.wakeLock.release('screen')
    }

    if (typeof screen !== 'undefined' && screen.keepAwake !== undefined) {
      screen.keepAwake = false
    }

    if (this._noSleep) {
      this._noSleep.disable()
    }
  }

  onClick () {
    const { method } = this.state
    switch (method) {
      case 'NoSleep.js':
        this._noSleep.enable()
        this.setState({method: 'NoSleep.js enabled'})
        return
      case 'NoSleep.js enabled':
        this._noSleep.disable()
        this.setState({method: 'NoSleep.js'})
        return
    }
  }

  render () {
    return (
      <div>
        <button onClick={this.onClick}>
          {this.state.method}
        </button>
      </div>
    )
  }
}
