import { UPDATE_LOCATION } from 'actions/watch-location'
import { waypoints } from 'waypoints'

const initialState = {
  waypoint: 0,
  distance: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      const { waypoint } = state
      return {
        ...state,
        distance: distance(action, waypoints[waypoint])
      }
    default:
      return state
  }
}

// returns the great-circle distance between two points (degrees) on a sphere
// https://en.wikipedia.org/wiki/Great-circle_distance#Computational_formulas
function distance (a, b) {
  const lat1 = DEG2RAD * a.latitude
  const lon1 = DEG2RAD * a.longitude
  const lat2 = DEG2RAD * b.latitude
  const lon2 = DEG2RAD * b.longitude
  const h = haversin(lat1 - lat2) + Math.cos(lat1) * Math.cos(lat2) * haversin(lon1 - lon2)
  return 2 * R_EARTH * Math.asin(Math.sqrt(h))
}

// haversin theta = sin^2 (theta / 2) = (1 - cos theta) / 2
// https://en.wikipedia.org/wiki/Versine#Definitions
const haversin = theta => 0.5 - 0.5 * Math.cos(theta)

const DEG2RAD = 0.01745329251994
const R_EARTH = 6371000.0
