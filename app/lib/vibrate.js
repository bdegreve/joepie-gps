export default (pattern) => {
  if (typeof navigator === 'undefined') {
    return false
  }
  const _vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
  if (!_vibrate) {
    return false
  }
  try {
    return _vibrate.call(navigator, pattern)
  } catch (err) {
    return false
  }
}
