import React from 'react'
import ReactDOM from 'react-dom'

// add reference to bootstrap css - requires bootstrap package
import 'bootstrap/dist/css/bootstrap.min.css'
// add reference to mdbootstrap css
import 'mdbootstrap/css/mdb.min.css'

import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
  document.getElementById('root')
)
