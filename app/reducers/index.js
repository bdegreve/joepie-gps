/* @flow */

import { combineReducers } from 'redux'

import geocache from './geocache'
import location from './location'
import waypoints from './waypoints'

import type { State as GeocacheState } from './geocache'
import type { State as LocationState } from './location'
import type { State as WaypointsState } from './waypoints'

export type State = {
  geocache: GeocacheState,
  location: LocationState,
  waypoints: WaypointsState
}

const rootReducer = combineReducers({
  geocache,
  location,
  waypoints
})

export default (state: State, action: $FlowFixMe): State => {
  const intermediate: State = rootReducer(state, action)
  return {
    ...intermediate,
    geocache: geocache(intermediate.geocache, action, intermediate)
  }
}
