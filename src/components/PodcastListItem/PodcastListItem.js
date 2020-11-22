import React from 'react'
import { Link } from 'react-router-dom'
import './PodcastListItem.css'

const PodcastListItem = ({ podcast }) => {
  return (
    <Link to='/podcast' style={{ textDecoration: 'none' }}>
      <div key={podcast.collectionId} className='podcast-list-item'>
        <img src={podcast.artworkUrl100} alt={podcast.collectionName} />
        <h3>{podcast.collectionName}</h3>
      </div>
    </Link>
  )
}

export default PodcastListItem
