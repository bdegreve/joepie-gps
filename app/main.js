import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import watchLocation from 'actions/watch-location'

import App from './app'
import store from './store'
import isomorphic from './isomorphic'
import './main.css'

watchLocation(action => store.dispatch(action))

const Root = () =>
  <Provider store={store}>
    <App />
  </Provider>

if (typeof document !== 'undefined') {
  ReactDOM.render(<Root />, document.getElementById('root'))
}

export default isomorphic(Root, {
  title: 'Joepie Challenge'
})
