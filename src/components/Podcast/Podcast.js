import React from 'react'
import { Link } from 'react-router-dom'

const Podcast = () => {
  return (
    <div>
      <Link to='/search'>
        <i className='fas fa-arrow-left' style={{ margin: '20px' }} />
      </Link>
    </div>
  )
}

export default Podcast
