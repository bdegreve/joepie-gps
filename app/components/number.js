import React from 'react'

export default ({ value, fixed }) => {
  if (value === null || value === undefined) {
    return null
  }

  if (fixed === true || fixed === 0) {
    value = value.toFixed()
  } else if (fixed > 0) {
    value = value.toFixed(fixed)
  }

  return <span>{value}</span>
}
