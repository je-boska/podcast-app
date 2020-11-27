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
    <>
      <h3 className='subscriptions-title'>Subscriptions</h3>
      <div className='subscriptions-list'>
        {subscriptions.map(podcast => (
          <PodcastListItem key={podcast.collectionId} podcast={podcast} />
        ))}
      </div>
    </>
  )
}

export default SubscriptionsList
