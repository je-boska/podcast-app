import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setEpisodes } from '../../slices/podcastSlice'
import { addSubscription } from '../../slices/subscriptionsSlice'
import { lookupEpisodes } from '../../PodcastRequests'
import './PodcastListItem.css'

const PodcastListItem = ({ podcast }) => {
  const {
    collectionId,
    collectionName,
    artworkUrl100,
    primaryGenreName,
  } = podcast

  const dispatch = useDispatch()

  const selectPodcastHandler = async () => {
    const episodes = await lookupEpisodes(collectionId)
    dispatch(setEpisodes(episodes.slice(1)))
  }

  const subscribeHandler = () => {
    dispatch(addSubscription(podcast))
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
        onClick={selectPodcastHandler}>
        <img src={artworkUrl100} alt={collectionName} />
        <div className='podcast-list-item-text'>
          <h3>{collectionName}</h3>
          <p>{primaryGenreName}</p>
        </div>
      </Link>
      <button className='subscribe-button' onClick={subscribeHandler}>
        <h3>+</h3>
      </button>
    </div>
  )
}

export default PodcastListItem
