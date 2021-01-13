import React, { useEffect, useState } from 'react'
import './Search.css'
import { searchPodcasts } from '../../PodcastRequests'
import { useSelector, useDispatch } from 'react-redux'
import {
  setLoading,
  selectLoading,
  setSearching,
  selectSearching,
  setSearchTerm,
  selectSearchTerm,
  setSearchResults,
  selectSearchResults,
} from '../../slices/searchSlice'

import Loader from '../Loader/Loader'
import PodcastListItem from '../PodcastListItem/PodcastListItem'
import { setSubscriptions } from '../../slices/subscriptionsSlice'

const Search = () => {
  const searching = useSelector(selectSearching)
  const loading = useSelector(selectLoading)
  const searchTerm = useSelector(selectSearchTerm)
  const results = useSelector(selectSearchResults)

  const [areMoreResults, setAreMoreResults] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    const localSubscriptions = JSON.parse(localStorage.getItem('subscriptions'))
    if (localSubscriptions) {
      dispatch(setSubscriptions(localSubscriptions))
    }
    // eslint-disable-next-line
  }, [])

  const getSearchResults = async (limit = 10) => {
    dispatch(setSearching(true))
    dispatch(setLoading(true))
    const { results, moreResults } = await searchPodcasts(searchTerm, limit)
    setAreMoreResults(moreResults)
    dispatch(setSearchResults(results))
    dispatch(setLoading(false))
  }

  const submitHandler = e => {
    e.preventDefault()
    document.getElementById('search-input').blur()
    if (searchTerm.length > 0) {
      getSearchResults()
    }
  }

  const showMoreResultsHandler = () => {
    getSearchResults(results.length + 10)
  }

  return (
    <div className='search-container'>
      <form
        onSubmit={e => {
          submitHandler(e)
        }}
        className='search-bar'>
        <div
          className='search-icon'
          onClick={e => {
            if (searching) {
              dispatch(setSearching(false))
              dispatch(setSearchTerm(''))
              dispatch(setSearchResults([]))
            } else {
              submitHandler(e)
            }
          }}>
          {searching ? (
            <i className='fas fa-times' />
          ) : (
            <i className='fas fa-search' />
          )}
        </div>
        <input
          id='search-input'
          autoComplete='off'
          placeholder='Search for podcasts'
          value={searchTerm}
          onChange={e => {
            dispatch(setSearchTerm(e.target.value))
          }}
        />
      </form>

      {loading ? (
        <div style={{ margin: '100px' }}>
          <Loader />
        </div>
      ) : (
        results.length > 0 && (
          <div className='search-container'>
            <div className='results-list'>
              {loading ? (
                <Loader />
              ) : (
                results.map(podcast => (
                  <PodcastListItem
                    key={podcast.collectionId}
                    podcast={podcast}
                  />
                ))
              )}
            </div>
            {areMoreResults && (
              <div
                className='show-more-results-container'
                onClick={showMoreResultsHandler}>
                <p className='show-more-results'>Show more results</p>
              </div>
            )}
          </div>
        )
      )}
    </div>
  )
}

export default Search
