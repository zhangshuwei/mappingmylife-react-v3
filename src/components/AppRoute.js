import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import MapView from '../containers/MapView'
import MyMap from '../components/MyMap'
import AppNav from '../components/AppNav'

const history = createBrowserHistory()
const AppRoute = ({store}) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <AppNav />
        <Route exact path='/' component={MapView} />
        <Route path='/map' component={MyMap} />
      </div>
    </ Router>
  </Provider>
)

export default AppRoute
