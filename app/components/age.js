/* @flow */

import React from 'react'

export type Props = {
  +timestamp: number
}

type State = {
  age: number
}

export default class extends React.Component<Props, State> {
  state: State
  _interval: ?number

  constructor () {
    super()
    this.state = {
      age: 0
    }
  }

  componentDidMount () {
    if (!this._interval) {
      this._interval = window.setInterval(() => this.updateAge(), 200)
    }
  }

  componentWillUnmount () {
    if (this._interval) {
      window.clearInterval(this._interval)
      this._interval = null
    }
  }

  updateAge () {
    const { timestamp } = this.props
    const age = Math.round((Date.now() - timestamp) / 1000)
    if (age !== this.state.age) {
      this.setState({ age })
    }
  }

  render () {
    const { age } = this.state
    return <span>{age}s</span>
  }
}
