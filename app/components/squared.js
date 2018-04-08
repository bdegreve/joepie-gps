/* @flow */
/* global Element */

import React from 'react'
import type { Node } from 'react'

import styles from './squared.css'

export type Props = {
  children?: Node
}

type State = {
  size: number
}

export default class extends React.Component<Props, State> {
  state: State
  onResize: void => void
  _container: ?Element

  constructor () {
    super()
    this.state = {
      size: 0
    }
    this.onResize = this._onResize.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize, false)
    this.calcSize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  _onResize () {
    this.calcSize()
  }

  calcSize () {
    if (!this._container) {
      return
    }
    const { clientWidth, clientHeight } = this._container
    const size = Math.min(clientWidth, clientHeight)
    if (size === this.state.size) {
      return
    }
    this.setState({
      size
    })
  }

  render () {
    const { size } = this.state
    const squareStyle = {
      width: `${size}px`,
      height: `${size}px`
    }
    return (
      <div
        className={styles.container}
        ref={c => {
          this._container = c
        }}
      >
        <div className={styles.square} style={squareStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
