import React from 'react'
import './PodcastListItem.css'

const PodcastListItem = ({ podcast }) => {
  return (
    <div key={podcast.collectionId} className='podcast-list-item'>
      <img src={podcast.artworkUrl100} alt={podcast.collectionName} />
      <h3>{podcast.collectionName}</h3>
    </div>
  )
}

export default PodcastListItem
