import React, { useState, useEffect } from 'react'
import './Search.css'
import { searchPodcasts } from '../../PodcastRequests'
import PodcastListItem from '../PodcastListItem/PodcastListItem'
import { useSelector, useDispatch } from 'react-redux'
import { selectSearchTerm, setSearchTerm } from '../../slices/searchTermSlice'

const Search = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)

  const [results, setResults] = useState([])

  useEffect(() => {
    getSearchResults()
    //eslint-disable-next-line
  }, [])

  const getSearchResults = async () => {
    const newPodcasts = await searchPodcasts(searchTerm)
    setResults(newPodcasts)
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
