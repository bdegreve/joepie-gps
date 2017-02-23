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
      const {longitude: lon1, latitude: lat1} = waypoints[waypoint]
      const {longitude: lon2, latitude: lat2} = action
      return {
        ...state,
        distance: distance({lat1, lon1, lat2, lon2})
      }
    default:
      return state
  }
}

// returns the great-circle distance between two points (degrees) on a sphere
function distance ({lat1, lon1, lat2, lon2}) {
  lat1 *= DEG2RAD
  lon1 *= DEG2RAD
  lat2 *= DEG2RAD
  lon2 *= DEG2RAD
  const h = sqr(Math.sin(0.5 * (lat1 - lat2))) +
    Math.cos(lat1) * Math.cos(lat2) * sqr(Math.sin(0.5 * (lon1 - lon2)))
  return 2 * R_EARTH * Math.asin(Math.sqrt(h))
}

const sqr = x => x * x
const DEG2RAD = 0.01745329251994
const R_EARTH = 6371000.0
