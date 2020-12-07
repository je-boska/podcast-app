import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Search from './components/Search/Search'
import SubscriptionsList from './components/SubscriptionsList/SubscriptionsList'
import CurrentEpisode from './components/CurrentEpisode/CurrentEpisode'
import EpisodeList from './components/EpisodeList/EpisodeList'
import Footer from './components/Player/Footer/Footer'
import CurrentEpisodeHero from './components/CurrentEpisodeHero/CurrentEpisodeHero'

function App() {
  return (
    <div className='App'>
      <Router>
        <Route path='/' component={Footer} />
        <Route path='/' component={CurrentEpisodeHero} exact />
        <Route path='/' component={Search} exact />
        <Route path='/' component={SubscriptionsList} exact />
        <Route path='/current-episode' component={CurrentEpisode} />
        <Route path='/episode-list' component={EpisodeList} />
      </Router>
    </div>
  )
}

export default App
