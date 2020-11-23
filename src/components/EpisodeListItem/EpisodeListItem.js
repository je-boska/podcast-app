import React from 'react'
import './EpisodeListItem.css'

const EpisodeListItem = ({ episode }) => {
  const { artworkUrl160, trackName, releaseDate } = episode

  return (
    <div className='episode-list-item'>
      <img src={artworkUrl160} alt={trackName} />
      <div className='episode-list-item-text'>
        <h4>{trackName}</h4>
        <p>{releaseDate.slice(0, 10)}</p>
      </div>
    </div>
  )
}

export default EpisodeListItem
