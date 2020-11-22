import React from 'react'
import './EpisodeListItem.css'

const EpisodeListItem = ({ episode }) => {
  const { artworkUrl160, trackName, description } = episode

  return (
    <div className='episode-list-item'>
      <img src={artworkUrl160} alt={trackName} />
      <div className='episode-list-item-text'>
        <h4>{trackName}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default EpisodeListItem
