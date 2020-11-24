import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setPodcast } from '../../slices/podcastSlice'
import './PodcastListItem.css'

const PodcastListItem = ({ podcast }) => {
  const {
    collectionId,
    collectionName,
    artworkUrl100,
    primaryGenreName,
  } = podcast

  const dispatch = useDispatch()

  const selectPodcastHandler = () => {
    dispatch(setPodcast(collectionId))
  }

  return (
    <Link
      to={`/episode-list/${collectionId}`}
      style={{ textDecoration: 'none' }}
      onClick={selectPodcastHandler}>
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

export default PodcastListItem
