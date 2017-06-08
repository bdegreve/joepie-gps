/* @flow */

import React from 'react'

export type Props = {
  +value: ?number,
  +fixed: boolean | number
}

export default (props: Props) => <span>{fix(props)}</span>

function fix ({ value, fixed }: Props) {
  if (value === null || value === undefined) {
    return null
  }
  if (fixed === true || fixed === 0) {
    return value.toFixed()
  }
  if (fixed && fixed > 0) {
    return value.toFixed(fixed)
  }
  return value
}
