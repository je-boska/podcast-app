import React, { useState } from 'react'
import './Search.css'
import searchPodcasts from '../../PodcastRequests'
import PodcastListItem from '../PodcastListItem/PodcastListItem'

const Search = () => {
  const [podcasts, setPodcasts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const submitHandler = async e => {
    e.preventDefault()
    const newPodcasts = await searchPodcasts(searchTerm)
    setPodcasts(newPodcasts)
  }
  return (
    <div className='search-container'>
      <form onSubmit={e => submitHandler(e)} className='search-bar'>
        <input
          placeholder='Search podcasts'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
      <div className='podcast-list'>
        {podcasts.map(podcast => (
          <PodcastListItem podcast={podcast} />
        ))}
      </div>
    </div>
  )
}

export default Search
