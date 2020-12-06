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
  const dispatch = useDispatch()
  const searching = useSelector(selectSearching)
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
      dispatch(setSearching(true))
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
      <form
        onSubmit={e => {
          submitHandler(e)
        }}
        className='search-bar'
      >
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
          }}
        >
          {searching ? (
            <i className='fas fa-times' />
          ) : (
            <i className='fas fa-search' />
          )}
        </div>
        <input
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
          <div
            className='search-container'
            style={{ flexBasis: `${results.length > 0 ? '600px' : '0px'}` }}
          >
            <div>
              <div className='podcast-list'>
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
    </div>
  )
}

export default Search
