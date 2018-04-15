/* @flow */

import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

import rootReducer from './reducers'
import type { State } from './reducers'

const persistedReducer = persistReducer(
  {
    key: 'joepie-gps',
    storage,
    whitelist: ['geocache']
  },
  rootReducer
)

function getInitialState (): ?State {
  if (typeof document === 'undefined') {
    return undefined
  }
  const initialState = document.getElementById('initial-state')
  if (!initialState) {
    return undefined
  }
  return JSON.parse(initialState.innerHTML)
}

const initialState = getInitialState()

// http://extension.remotedev.io/
const _compose =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

export default createStore(
  persistedReducer,
  initialState,
  _compose(applyMiddleware(thunkMiddleware))
)
