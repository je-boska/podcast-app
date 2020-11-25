import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { selectCurrentEpisode } from '../../slices/podcastSlice'
import { useSelector } from 'react-redux'

const Header = () => {
  const { collectionId, trackId } = useSelector(selectCurrentEpisode)

  return (
    <header className='header'>
      <h2>
        <Link to='/search'>
          <i className='fas fa-search header-item' />
        </Link>
        <Link to='/subscriptions'>
          <i className='fas fa-list header-item' />
        </Link>
        <Link to={`/player/${collectionId}/${trackId}`}>
          <i className='fas fa-headphones-alt header-item' />
        </Link>
      </h2>
    </header>
  )
}

export default Header
