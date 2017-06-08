const w = typeof window === 'undefined' ? global : window

let raf =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.mozRequestAnimationFrame ||
  w.oRequestAnimationFrame ||
  w.msRequestAnimationFrame

let caf =
  w.cancelAnimationFrame ||
  w.webkitCancelRequestAnimationFrame ||
  w.mozCancelRequestAnimationFrame ||
  w.oCancelRequestAnimationFrame ||
  w.msCancelAnimationFrame

if (!raf || !caf) {
  raf = function (callback) {
    return w.setTimeout(() => callback(Date.now()), 1000 / 30)
  }
  caf = w.clearTimeout
}

export const requestAnimationFrame = raf
export const cancelAnimationFrame = caf
