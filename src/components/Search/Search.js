import React, { useEffect } from 'react'
import './Search.css'
import { searchPodcasts } from '../../PodcastRequests'
import { useSelector, useDispatch } from 'react-redux'
import {
  setLoading,
  selectLoading,
  setSearchTerm,
  selectSearchTerm,
  setSearchResults,
  selectSearchResults,
} from '../../slices/searchSlice'

import Loader from '../Loader/Loader'
import PodcastListItem from '../PodcastListItem/PodcastListItem'
import { selectSubscriptions } from '../../slices/subscriptionsSlice'

const Search = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const searchTerm = useSelector(selectSearchTerm)
  const results = useSelector(selectSearchResults)
  const subscriptions = useSelector(selectSubscriptions)

  useEffect(() => {
    getSearchResults()
    // eslint-disable-next-line
  }, [subscriptions])

  const getSearchResults = async () => {
    dispatch(setLoading(true))
    const newResults = await searchPodcasts(searchTerm)
    const filteredResults = filterSubscriptions(newResults)
    dispatch(setSearchResults(filteredResults))
    dispatch(setLoading(false))
  }

  const filterSubscriptions = searchResults => {
    for (let i = 0; i < searchResults.length; i++) {
      for (let j = 0; j < subscriptions.length; j++) {
        if (searchResults[i].collectionId === subscriptions[j].collectionId) {
          searchResults[i].subscribed = true
        }
      }
    }
    return searchResults
  }

  const submitHandler = e => {
    e.preventDefault()
    getSearchResults()
  }

  return (
    <div className='search-container'>
      <form onSubmit={e => submitHandler(e)} className='search-bar'>
        <input
          placeholder='Search podcasts'
          value={searchTerm}
          onChange={e => dispatch(setSearchTerm(e.target.value))}
        />
      </form>
      <div className='podcast-list'>
        {loading ? (
          <Loader />
        ) : (
          results.map(podcast => (
            <PodcastListItem key={podcast.collectionId} podcast={podcast} />
          ))
        )}
      </div>
    </div>
  )
}

export default Search
