import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <h2>
        <Link to='/search'>
          <i className='fas fa-search header-item' />
        </Link>
        <Link to='/subscriptions'>
          <i className='fas fa-list header-item' />
        </Link>
        <Link to={`/player`}>
          <i className='fas fa-headphones-alt header-item' />
        </Link>
      </h2>
    </header>
  )
}

export default Header
