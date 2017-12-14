import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'

const persistConfig = {
  key: 'joepie-gps',
  storage,
  whitelist: ['geocache']
}

function getInitialState () {
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
const _compose = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export default createStore(
  persistReducer(persistConfig, rootReducer),
  initialState,
  _compose(applyMiddleware(thunkMiddleware))
)
