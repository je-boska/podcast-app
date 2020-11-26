import React from 'react'
import './Search.css'
import { searchPodcasts } from '../../PodcastRequests'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectSearchTerm,
  setSearchTerm,
  setSearchResults,
  selectSearchResults,
} from '../../slices/searchSlice'

import PodcastListItem from '../PodcastListItem/PodcastListItem'

const Search = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)
  const results = useSelector(selectSearchResults)

  const getSearchResults = async () => {
    const newResults = await searchPodcasts(searchTerm)
    dispatch(setSearchResults(newResults))
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
        {results.map(podcast => (
          <PodcastListItem key={podcast.collectionId} podcast={podcast} />
        ))}
      </div>
    </div>
  )
}

export default Search
