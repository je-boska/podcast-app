import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './PodcastListItem.css'
import { setPodcast } from '../../slices/podcastSlice'
import SubscribeButton from '../../components/SubscribeButton/SubscribeButton'

const PodcastListItem = ({ podcast }) => {
  const {
    collectionId,
    collectionName,
    artworkUrl100,
    primaryGenreName,
  } = podcast

  const dispatch = useDispatch()

  const selectPodcastHandler = () => {
    dispatch(setPodcast(podcast))
    localStorage.setItem('current-podcast', JSON.stringify(podcast))
  }

  return (
    <div key={collectionId} className='podcast-list-item'>
      <Link
        to={`/episode-list`}
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={selectPodcastHandler}
      >
        <img src={artworkUrl100} alt={collectionName} />
        <div className='podcast-list-item-text'>
          <h4>{collectionName}</h4>
          <p>{primaryGenreName}</p>
        </div>
      </Link>
      <SubscribeButton podcast={podcast} />
    </div>
  )
}

export default PodcastListItem
