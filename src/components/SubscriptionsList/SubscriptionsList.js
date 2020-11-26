import React from 'react'
import './SubscriptionsList.css'
import { useSelector } from 'react-redux'
import { selectSubscriptions } from '../../slices/subscriptionsSlice'
import PodcastListItem from '../PodcastListItem/PodcastListItem'

const SubscriptionsList = () => {
  const subscriptions = useSelector(selectSubscriptions)

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
