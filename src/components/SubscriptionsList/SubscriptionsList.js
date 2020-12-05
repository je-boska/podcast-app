import React, { useEffect } from 'react'
import './SubscriptionsList.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectSubscriptions,
  setSubscriptions,
} from '../../slices/subscriptionsSlice'
import PodcastListItem from '../PodcastListItem/PodcastListItem'

const SubscriptionsList = () => {
  const subscriptions = useSelector(selectSubscriptions)

  const dispatch = useDispatch()

  useEffect(() => {
    const localSubscriptions = JSON.parse(localStorage.getItem('subscriptions'))
    if (localSubscriptions) {
      dispatch(setSubscriptions(localSubscriptions))
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='subscriptions-container'>
      <h3 className='subscriptions-title'>
        {subscriptions.length < 1 ? (
          <p style={{ marginTop: '50%' }}>
            Not subscribed to any podcasts <br /> - <br /> Click the search icon
            to find something to subscribe to
          </p>
        ) : (
          'Your subscriptions'
        )}
      </h3>
      <div className='subscriptions-list'>
        {subscriptions.map(podcast => (
          <PodcastListItem key={podcast.collectionId} podcast={podcast} />
        ))}
      </div>
    </div>
  )
}

export default SubscriptionsList
