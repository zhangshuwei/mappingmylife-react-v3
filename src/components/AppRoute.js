import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import HomePage from '../containers/HomePage'
import TestMap from '../components/TestMap'
import AppNav from '../components/AppNav'

const history = createBrowserHistory()
const AppRoute = ({store}) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <AppNav />
        <Route exact path='/' component={HomePage} />
        <Route path='/map' component={TestMap} />
      </div>
    </ Router>
  </Provider>
)

export default AppRoute
