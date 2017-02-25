import React from 'react'
import { connect } from 'react-redux'

import style from './errors.css'

const View = ({errors}) => {
  if (!errors || !errors.length) {
    return null
  }
  return (
    <div className={style.view}>
      {errors.map((error, index) =>
        <p key={index}>{error}</p>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const errors = Object.keys(state)
    .map(key => state[key] && state[key].error)
    .filter(error => error && error.length)
  return {
    errors
  }
}

export default connect(mapStateToProps)(View)
