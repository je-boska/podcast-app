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
    <Link
      to={`/episode-list/${collectionId}`}
      style={{ textDecoration: 'none' }}
      onClick={selectPodcastHandler}>
      <div key={collectionId} className='podcast-list-item'>
        <img src={artworkUrl100} alt={collectionName} />
        <div className='podcast-list-item-text'>
          <h3>{collectionName}</h3>
          <p>{primaryGenreName}</p>
          <button onClick={subscribeHandler}>Subscribe</button>
        </div>
      </div>
    </Link>
  )
}

export default PodcastListItem
