import React from 'react'
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

const Search = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const searchTerm = useSelector(selectSearchTerm)
  const results = useSelector(selectSearchResults)

  const getSearchResults = async () => {
    dispatch(setLoading(true))
    const newResults = await searchPodcasts(searchTerm)
    dispatch(setSearchResults(newResults))
    dispatch(setLoading(false))
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
