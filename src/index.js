import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import {Scentsible} from './components/Scentsible'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>      
      <Scentsible />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)