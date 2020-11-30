import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  addSubscription,
  removeSubscription,
  selectSubscriptions,
} from '../../slices/subscriptionsSlice'
import './PodcastListItem.css'
import { setPodcast } from '../../slices/podcastSlice'

const PodcastListItem = ({ podcast }) => {
  const {
    collectionId,
    collectionName,
    artworkUrl100,
    primaryGenreName,
  } = podcast

  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const subscriptions = useSelector(selectSubscriptions)

  useEffect(() => {
    checkIfSubscribed()
    // eslint-disable-next-line
  }, [])

  const checkIfSubscribed = () => {
    for (let i = 0; i < subscriptions.length; i++) {
      if (collectionId === subscriptions[i].collectionId) {
        setSubscribed(true)
      }
    }
    setLoading(false)
  }

  const selectPodcastHandler = () => {
    dispatch(setPodcast(podcast))
    localStorage.setItem("current-podcast", JSON.stringify(podcast))
  }

  const subscribeHandler = () => {
    const localSubs = JSON.parse(localStorage.getItem('subscriptions'))
    if (subscribed || podcast.subscribed) {
      dispatch(removeSubscription(podcast))
      setSubscribed(false)
      const newSubs = localSubs.filter(sub => sub.collectionId !== collectionId)
      localStorage.setItem('subscriptions', JSON.stringify(newSubs))
    } else {
      const subscribedPodcast = {
        ...podcast,
        subscribed: true,
      }
      dispatch(addSubscription(subscribedPodcast))
      setSubscribed(true)
      if (localSubs) {
        const newSubs = localSubs.concat(subscribedPodcast)
        localStorage.setItem('subscriptions', JSON.stringify(newSubs))
      } else {
        localStorage.setItem(
          'subscriptions',
          JSON.stringify([subscribedPodcast])
        )
      }
    }
  }

  return (
    <div key={collectionId} className='podcast-list-item'>
      <Link
        to={`/episode-list`}
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
        }} onClick={selectPodcastHandler}>
        <img src={artworkUrl100} alt={collectionName} />
        <div className='podcast-list-item-text'>
          <h4>{collectionName}</h4>
          <p>{primaryGenreName}</p>
        </div>
      </Link>
      {loading ? null : subscribed ? (
        <button className='button unsubscribe' onClick={subscribeHandler}>
          <i className='fas fa-minus'></i>
        </button>
      ) : (
        <button className='button subscribe' onClick={subscribeHandler}>
          <i className='fas fa-plus'></i>
        </button>
      )}
    </div>
  )
}

export default PodcastListItem
