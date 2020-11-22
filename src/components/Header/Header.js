import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className='header'>
      <h2>
        <i className='fas fa-search header-item' />
        <i className='fas fa-list header-item' />
        <i className='fas fa-play header-item' />
      </h2>
    </header>
  )
}

export default Header
