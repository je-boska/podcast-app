import React, { useState, useEffect } from 'react'
import './App.css'
import getPodcasts from './PodcastRequests'

function App() {
  const [podcasts, setPodcasts] = useState([])

  const updatePodcastState = async () => {
    const newPodcasts = await getPodcasts()
    setPodcasts(newPodcasts)
  }

  useEffect(() => {
    updatePodcastState()
    // eslint-disable-next-line
  }, [])

  return (
    <div className='App'>
      {podcasts.map(podcast => (
        <div key={podcast.collectionId}>
          <p>{podcast.collectionName}</p>
          <img src={podcast.artworkUrl100} alt={podcast.collectionName} />
        </div>
      ))}
    </div>
  )
}

export default App
