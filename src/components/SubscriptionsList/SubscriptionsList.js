import React from 'react'
import './SubscriptionsList.css'
import { useSelector } from 'react-redux'
import { selectSubscriptions } from '../../slices/subscriptionsSlice'
import SubscriptionsListItem from '../SubscriptionsListItem/SubscriptionsListItem'

const SubscriptionsList = () => {
  const subscriptions = useSelector(selectSubscriptions)

  return (
    <>
      <h3 className='subscriptions-title'>Subscriptions</h3>
      <div className='subscriptions-list'>
        {subscriptions.map(subscription => (
          <SubscriptionsListItem
            key={subscription.collectionId}
            subscription={subscription}
          />
        ))}
      </div>
    </>
  )
}

export default SubscriptionsList
