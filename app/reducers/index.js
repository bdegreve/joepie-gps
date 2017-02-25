import { combineReducers } from 'redux'

import geocache from './geocache'
import location from './location'
import waypoints from './waypoints'

const rootReducer = combineReducers({
  geocache,
  location,
  waypoints
})

export default (state, action) => {
  const intermediate = rootReducer(state, action)
  return {
    ...intermediate,
    geocache: geocache(intermediate.geocache, action, intermediate)
  }
}
