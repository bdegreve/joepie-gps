/* global screen */

import React from 'react'
import NoSleep from 'nosleep'

import Switch from 'app/components/switch'

// hacky support
// this is still in draft: https://w3c.github.io/wake-lock/
//
// let's try a few other things too ...

const NAVIGATOR_GET_WAKE_LOCK = 'navigator.getWakeLock'
const NAVIGATOR_REQUEST_WAKE_LOCK = 'navigator.requestWakeLock'
const NAVIGATOR_WAKE_LOCK = 'navigator.wakeLock'
const SCREEN_KEEP_AWAKE = 'screen.keepAwake'
const NO_SLEEP_JS = 'NoSleep.js'

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      method: '',
      enabled: false
    }
    this.onChangeSleep = this.onChangeSleep.bind(this)
  }

  componentDidMount () {
    // "official" way: https://w3c.github.io/wake-lock/
    if (typeof navigator !== 'undefined' && navigator.getWakeLock !== undefined) {
      navigator.getWakeLock('system').then(wakeLock => {
        this._request = wakeLock.createRequest()
        this.setState({enabled: true})
      })
      this.setState({method: NAVIGATOR_GET_WAKE_LOCK})
      return
    }

    // firefox OS thing: https://developer.mozilla.org/en-US/docs/Mozilla/B2G_OS/API/Wake_Lock_API
    if (typeof navigator !== 'undefined' && navigator.requestWakeLock !== undefined) {
      this._lock = navigator.requestWakeLock('gps')
      this.setState({method: NAVIGATOR_REQUEST_WAKE_LOCK, enabled: true})
      return
    }

    // never implemented? https://www.sitepoint.com/3-new-javascript-apis-may-want-follow/
    if (typeof navigator !== 'undefined' && navigator.wakeLock !== undefined) {
      navigator.wakeLock.request('screen')
        .then(() => {
          this.setState({enabled: true})
        })
      this.setState({method: NAVIGATOR_WAKE_LOCK})
      return
    }

    // https://whatwebcando.today/wake-lock.html
    if (typeof screen !== 'undefined' && screen.keepAwake !== undefined) {
      screen.keepAwake = true
      this.setState({method: SCREEN_KEEP_AWAKE, enabled: true})
      return
    }

    // oh shit, nothing works, let's do this other thing then ...
    if (typeof document !== 'undefined') {
      this._noSleep = new NoSleep()
      this.setState({method: NO_SLEEP_JS})
      document.addEventListener('click', this.onClick, false)
    }
  }

  componentWillUnmount () {
    switch (this.state.method) {
      case NAVIGATOR_GET_WAKE_LOCK:
        if (this._request) {
          this._request.cancel()
        }
        break

      case NAVIGATOR_REQUEST_WAKE_LOCK:
        this._lock.unlock()
        break

      case NAVIGATOR_WAKE_LOCK:
        navigator.wakeLock.release('screen')
        break

      case SCREEN_KEEP_AWAKE:
        screen.keepAwake = false
        break

      case NO_SLEEP_JS:
        document.removeEventListener('click', this.onClick, false)
        this._noSleep.disable()
        break
    }
  }

  onChangeSleep (ev) {
    const { checked } = ev.target
    this.setState(({ method, enabled }) => {
      if (method !== NO_SLEEP_JS) {
        return
      }
      if (checked && !enabled) {
        this._noSleep.enable()
      } else if (enabled && !checked) {
        this._noSleep.disable()
      }
      return {
        enabled: checked
      }
    })
  }

  render () {
    const { method, enabled } = this.state
    if (method !== NO_SLEEP_JS) {
      return null
    }
    return (
      <div>
        <Switch checked={enabled} onChange={this.onChangeSleep}>
          Hou scherm aan ...
        </Switch>
      </div>
    )
  }
}
