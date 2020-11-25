import React from 'react'
import { Link } from 'react-router-dom'

const SubscriptionsListItem = ({ subscription }) => {
  const {
    collectionId,
    collectionName,
    artworkUrl100,
    primaryGenreName,
  } = subscription

  return (
    <Link
      to={`/episode-list/${collectionId}`}
      style={{ color: 'black', textDecoration: 'none' }}>
      <div key={collectionId} className='podcast-list-item'>
        <img src={artworkUrl100} alt={collectionName} />
        <div className='podcast-list-item-text'>
          <h3>{collectionName}</h3>
          <p>{primaryGenreName}</p>
        </div>
      </div>
    </Link>
  )
}

export default SubscriptionsListItem
