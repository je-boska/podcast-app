import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Search from './components/Search/Search'
import Subscriptions from './components/Subscriptions/Subscriptions'
import Player from './components/Player/Player'
import Podcast from './components/Podcast/Podcast'

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Route path='/' component={Search} exact />
        <Route path='/search' component={Search} />
        <Route path='/subscriptions' component={Subscriptions} />
        <Route path='/player' component={Player} />
        <Route path='/podcast' component={Podcast} />
      </Router>
    </div>
  )
}

export default App
