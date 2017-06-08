/* @flow */

import { GEOCACHE_RESTART } from 'actions/geocache'
import { LOCATION_UPDATE } from 'actions/location'
import { WAYPOINTS_FETCHED } from 'actions/waypoints'
import { REHYDRATE } from 'redux-persist/constants'

import type { State as LocationState } from './location'
import type { State as WaypointsState, Waypoint } from './waypoints'

export type State = {
  +waypoint: number,
  +distance: number,
  +isFetching: boolean,
  +isFinished: boolean,
  +isFurther: boolean,
  +threshold: number,
  +tolerance: number
}

export type Intermediate = {
  +location: LocationState,
  +waypoints: WaypointsState
}

const initialState: State = {
  waypoint: 0,
  distance: Infinity,
  isFetching: true,
  isFinished: false,
  isFurther: false,
  threshold: Infinity,
  tolerance: 10
}

export default (
  state: State = initialState,
  action: $FlowFixMe,
  intermediate?: Intermediate
): State => {
  if (!intermediate) {
    switch (action.type) {
      case GEOCACHE_RESTART:
        return {
          ...state,
          waypoint: 0,
          isFinished: false,
          isFurther: false,
          threshold: Infinity
        }

      case REHYDRATE:
        if (!action.payload.geocache) {
          return state
        }
        const {
          waypoint,
          isFinished,
          isFurther,
          threshold
        } = action.payload.geocache
        return {
          ...state,
          waypoint,
          isFinished,
          isFurther,
          threshold
        }

      case WAYPOINTS_FETCHED:
        const { tolerance } = action.data
        return tolerance ? { ...state, tolerance } : state

      default:
        return state
    }
  }

  switch (action.type) {
    case LOCATION_UPDATE:
    case WAYPOINTS_FETCHED:
      const { location, waypoints } = intermediate

      if (state.isFinished) {
        return state // we're done!
      }

      const isFetching = location.isFetching || waypoints.isFetching
      if (isFetching) {
        return {
          ...state,
          isFetching
        }
      }

      const _waypoints = waypoints.waypoints
      const n = _waypoints.length

      let { waypoint, isFurther, threshold, tolerance } = state
      let distance = geoDistance(location, _waypoints[waypoint]) - tolerance
      while (distance <= 0 && waypoint < n - 1) {
        ++waypoint
        distance = geoDistance(location, _waypoints[waypoint]) - tolerance
        isFurther = false
        threshold = Infinity
      }

      const hysteresis = Math.max(1, 0.001 * distance)
      if (isFurther) {
        if (distance < threshold) {
          isFurther = false
          threshold = distance + hysteresis
        } else {
          threshold = Math.max(threshold, distance - hysteresis)
        }
      } else {
        if (distance > threshold) {
          isFurther = true
          threshold = distance - hysteresis
        } else {
          threshold = Math.min(threshold, distance + hysteresis)
        }
      }

      return {
        ...state,
        waypoint,
        distance,
        isFetching,
        isFinished: waypoint === n - 1 && distance <= 0,
        isFurther,
        threshold
      }

    default:
      return state
  }
}

// returns the great-circle distance between two points (degrees) on a sphere
// https://en.wikipedia.org/wiki/Great-circle_distance#Computational_formulas
function geoDistance (a: Waypoint, b: Waypoint): number {
  const lat1 = DEG2RAD * a.latitude
  const lon1 = DEG2RAD * a.longitude
  const lat2 = DEG2RAD * b.latitude
  const lon2 = DEG2RAD * b.longitude
  const h =
    haversin(lat1 - lat2) +
    Math.cos(lat1) * Math.cos(lat2) * haversin(lon1 - lon2)
  return 2 * R_EARTH * Math.asin(Math.sqrt(h))
}

// haversin theta = sin^2 (theta / 2) = (1 - cos theta) / 2
// https://en.wikipedia.org/wiki/Versine#Definitions
const haversin = (theta: number) => 0.5 * (1 - Math.cos(theta))

const DEG2RAD = 0.01745329251994
const R_EARTH = 6371000.0
