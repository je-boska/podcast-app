import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Search from './components/Search/Search'
import SubscriptionsList from './components/SubscriptionsList/SubscriptionsList'
import Player from './components/Player/Player/Player'
import EpisodeList from './components/EpisodeList/EpisodeList'

function App() {
  return (
    <div className='App'>
      <Player />
      <Router>
        <Route path='/' component={Search} exact />
        <Route path='/' component={SubscriptionsList} exact />
        <Route path='/episode-list' component={EpisodeList} />
      </Router>
    </div>
  )
}

export default App
