import React, { useEffect, useState } from 'react'
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
import { setSubscriptions } from '../../slices/subscriptionsSlice'

const Search = () => {
  const [searching, setSearching] = useState(false)

  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const searchTerm = useSelector(selectSearchTerm)
  const results = useSelector(selectSearchResults)

  useEffect(() => {
    const localSubscriptions = JSON.parse(localStorage.getItem('subscriptions'))
    if (localSubscriptions) {
      dispatch(setSubscriptions(localSubscriptions))
    }
    // eslint-disable-next-line
  }, [])

  const getSearchResults = async () => {
    if (searchTerm.length > 0) {
      dispatch(setLoading(true))
      const newResults = await searchPodcasts(searchTerm)
      dispatch(setSearchResults(newResults))
      dispatch(setLoading(false))
    }
  }

  const submitHandler = e => {
    e.preventDefault()
    getSearchResults()
  }

  return (
    <div className='search-container'>
      <div
        className='search-icon'
        onClick={() => {
          setSearching(!searching)
          if (searching) {
            dispatch(setSearchTerm(''))
            dispatch(setSearchResults([]))
          }
        }}
      >
        <div className='search-icon-container'>
          {searching ? (
            <i className='fas fa-times' style={{ opacity: '0.5' }} />
          ) : (
            <i className='fas fa-search' />
          )}
        </div>
      </div>
      {!searching ? null : (
        <div>
          <form onSubmit={e => submitHandler(e)} className='search-bar'>
            <input
              placeholder='Search'
              value={searchTerm}
              onChange={e => dispatch(setSearchTerm(e.target.value))}
            />
          </form>
          <div
            className='podcast-list'
            style={{
              margin: `${results.length < 1 ? '0px auto' : '105px auto'}`,
            }}
          >
            {loading ? (
              <Loader />
            ) : (
              results.map(podcast => (
                <PodcastListItem key={podcast.collectionId} podcast={podcast} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
