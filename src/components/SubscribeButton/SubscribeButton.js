import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPodcast } from '../../slices/podcastSlice'
import {
  addSubscription,
  removeSubscription,
  selectSubscriptions,
} from '../../slices/subscriptionsSlice'
import './SubscribeButton.css'

const SubscribeButton = ({ podcast }) => {
  const { collectionId } = podcast

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

  const subscribeHandler = () => {
    const localSubs = JSON.parse(localStorage.getItem('subscriptions'))
    if (subscribed || podcast.subscribed) {
      dispatch(removeSubscription(podcast))
      dispatch(setPodcast({ ...podcast, subscribed: false }))
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
    <>
      {loading ? null : subscribed ? (
        <button className='button unsubscribe' onClick={subscribeHandler}>
          <i className='fas fa-minus'></i>
        </button>
      ) : (
        <button className='button subscribe' onClick={subscribeHandler}>
          <i className='fas fa-plus'></i>
        </button>
      )}
    </>
  )
}

export default SubscribeButton
