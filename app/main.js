import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import watchLocation from 'actions/watch-location'

import App from './app'
import store from './store'
import './main.css'

watchLocation(action => store.dispatch(action))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
