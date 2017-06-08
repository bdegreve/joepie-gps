/* @flow */

import React from 'react'
import { connect } from 'react-redux'

import { restart } from 'actions/geocache'

const View = ({ restart }) => (
  <a
    href='#'
    onClick={e => {
      e.preventDefault()
      if (window.confirm('Are you sure you want to restart?')) {
        restart()
      }
    }}
  >
    Restart
  </a>
)

export default connect(null, dispatch => ({
  restart: () => dispatch(restart())
}))(View)
