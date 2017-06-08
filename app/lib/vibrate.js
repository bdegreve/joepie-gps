/* @flow */

export default (pattern: number | number[]): boolean => {
  if (typeof navigator === 'undefined') {
    return false
  }
  const _vibrate =
    navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    // $FlowFixMe
    navigator.msVibrate
  if (!_vibrate) {
    return false
  }
  try {
    return _vibrate.call(navigator, pattern)
  } catch (err) {
    return false
  }
}
