import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Search from './components/Search/Search'
import SubscriptionsList from './components/SubscriptionsList/SubscriptionsList'
import Player from './components/Player/Player/Player'
import EpisodeList from './components/EpisodeList/EpisodeList'

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Route path='/' component={Search} exact />
        <Route path='/search' component={Search} />
        <Route path='/subscriptions' component={SubscriptionsList} />
        <Route path='/player' component={Player} />
        <Route path='/episode-list' component={EpisodeList} />
      </Router>
    </div>
  )
}

export default App
