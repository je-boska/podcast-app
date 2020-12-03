import React, { useEffect } from 'react'
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
    <>
      <div
        className='search-icon'
        onClick={() => {
          dispatch(setSearching(!searching))
          if (searching) {
            dispatch(setSearchTerm(''))
            dispatch(setSearchResults([]))
          }
        }}
      >
        {searching ? (
          <i className='fas fa-times' style={{ opacity: '0.7' }} />
        ) : (
          <i className='fas fa-search' />
        )}
      </div>
      {searching && (
        <form onSubmit={e => submitHandler(e)} className='search-bar'>
          <input
            placeholder='Search'
            value={searchTerm}
            onChange={e => dispatch(setSearchTerm(e.target.value))}
          />
        </form>
      )}
      {loading ? (
        <div style={{ margin: '100px' }}>
          <Loader />
        </div>
      ) : (
        results.length > 0 && (
          <div
            className='search-container'
            style={{ flexBasis: `${results.length > 0 ? '600px' : '0px'}` }}
          >
            <div>
              <div
                className='podcast-list'
                style={{
                  margin: `${
                    results.length < 0 ? '0px auto' : '105px auto 0px auto'
                  }`,
                }}
              >
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
            </div>
          </div>
        )
      )}
    </>
  )
}

export default Search
