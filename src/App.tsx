import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'

import { store } from './store'
import Main from '@/modules/Main/Main'
import '@/styles/global.less'

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </Provider>
)

export default hot(App)
