import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Search from './components/Search/Search'
import SubscriptionsList from './components/SubscriptionsList/SubscriptionsList'
import Player from './components/Player/Player/Player'
import EpisodeList from './components/EpisodeList/EpisodeList'
import { useSelector } from 'react-redux'
import { selectSearching } from './slices/searchSlice'

function App() {
  const searching = useSelector(selectSearching)

  return (
    <div className='App'>
      <Player />
      <Router>
        <div
          className='search-subs-container'
          style={{ flexDirection: `${searching ? 'row' : 'column'}` }}
        >
          <Route path='/' component={Search} exact />
          <Route path='/' component={SubscriptionsList} exact />
        </div>
        <Route path='/episode-list' component={EpisodeList} />
      </Router>
    </div>
  )
}

export default App
