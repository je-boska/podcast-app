import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Search from './components/Search/Search'
import SubscriptionsList from './components/SubscriptionsList/SubscriptionsList'
import Player from './components/Player/Player/Player'
import EpisodeList from './components/EpisodeList/EpisodeList'
import Header from './components/Header/Header'
import CurrentEpisode from './components/CurrentEpisode/CurrentEpisode'

function App() {
  return (
    <div className='App'>
      <Router>
        <Route path='/' component={Header} />
        <Route path='/' component={CurrentEpisode} exact />
        <Route path='/' component={Search} exact />
        <Route path='/' component={SubscriptionsList} exact />
        <Route path='/player' component={Player} />
        <Route path='/episode-list' component={EpisodeList} />
      </Router>
    </div>
  )
}

export default App
