/* @flow */

import React from 'react'

import {
  requestAnimationFrame,
  cancelAnimationFrame
} from 'lib/request-animation-frame'

import styles from './ripple.css'

export type Props = {
  +stroke: string,
  +period: number
}

type State = {
  phase: number,
  time: number | null,
  request: number | null
}

class Ripple extends React.Component<Props, State> {
  static defaultProps: Props
  state: State
  tick: number => void

  constructor () {
    super()

    this.state = {
      phase: 0,
      time: null,
      request: null
    }

    this.tick = this._tick.bind(this)
  }

  componentDidMount () {
    this.setState({
      request: requestAnimationFrame(this.tick)
    })
  }

  componentWillUnmount () {
    cancelAnimationFrame(this.state.request)
  }

  _tick (time: number) {
    this.setState((prev, { period }) => ({
      time,
      phase: (prev.phase + dt(time, prev.time) / period) % 1,
      request: requestAnimationFrame(this.tick)
    }))
  }

  render () {
    const { stroke } = this.props
    const { phase } = this.state

    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
        className={styles.container}
      >
        <rect x='0' y='0' width='100' height='100' fill='none' />
        <Circle phase={phase} stroke={stroke} />
        <Circle phase={(phase + 0.5) % 1} stroke={stroke} />
      </svg>
    )
  }
}

Ripple.defaultProps = {
  stroke: '#5cffd6',
  period: 2000
}

const Circle = ({ phase, ...rest }) => (
  <circle
    cx='50'
    cy='50'
    r={phase * 40}
    opacity={op(phase)}
    fill='none'
    strokeWidth='6'
    strokeLinecap='round'
    {...rest}
  />
)

const dt = (time, prevTime) => (prevTime !== null ? time - prevTime : 0)
const op = phase => 1 - phase * phase

export default Ripple
