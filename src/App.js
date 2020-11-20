import React, { useState } from 'react'
import './App.css'
import searchPodcasts from './PodcastRequests'

function App() {
  const [podcasts, setPodcasts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const submitHandler = async e => {
    e.preventDefault()
    const newPodcasts = await searchPodcasts(searchTerm)
    setPodcasts(newPodcasts)
  }

  return (
    <div className='App'>
      <form onSubmit={e => submitHandler(e)} className='searchBar'>
        <input
          placeholder='Search podcasts'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
      <div className='podcast-list'>
        {podcasts.map(podcast => (
          <div key={podcast.collectionId} className='podcast'>
            <p>{podcast.collectionName}</p>
            <img src={podcast.artworkUrl100} alt={podcast.collectionName} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
