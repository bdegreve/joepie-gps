import React from 'react'

import styles from './squared.css'

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      size: 0
    }
    this.onResize = this.onResize.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResize, false)
    this.calcSize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onResize)
  }

  onResize () {
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
