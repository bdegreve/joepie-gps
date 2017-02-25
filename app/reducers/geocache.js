import { LOCATION_UPDATE } from 'actions/location'
import { WAYPOINTS_FETCHED } from 'actions/waypoints'

const REQUIRED_ACCURACY = 20
const TOLERANCE = 10

const initialState = {
  waypoint: 0,
  distance: null,
  isFetching: true
}

export default (state = initialState, action, globalState) => {
  switch (action.type) {
    case LOCATION_UPDATE:
    case WAYPOINTS_FETCHED:
      const { location, waypoints } = globalState

      const isFetching = location.isFetching || waypoints.isFetching
      if (isFetching) {
        return {
          ...state,
          isFetching
        }
      }

      const _waypoints = waypoints.waypoints
      let { waypoint } = state
      let distance = geoDistance(location, _waypoints[waypoint])

      if (location.accuracy > REQUIRED_ACCURACY) {
        return {
          ...state,
          distance,
          isFetching
        }
      }

      while (distance < TOLERANCE && waypoint < (_waypoints.length - 1)) {
        ++waypoint
        distance = geoDistance(location, _waypoints[waypoint])
      }

      return {
        waypoint,
        distance,
        isFetching
      }

    default:
      return state
  }
}

// returns the great-circle distance between two points (degrees) on a sphere
// https://en.wikipedia.org/wiki/Great-circle_distance#Computational_formulas
function geoDistance (a, b) {
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
