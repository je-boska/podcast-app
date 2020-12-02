import React from 'react'
import './Loader.css'

const Loader = ({ color = 'black' }) => {
  return (
    <div className='lds-ellipsis'>
      <div style={{ backgroundColor: color }}></div>
      <div style={{ backgroundColor: color }}></div>
      <div style={{ backgroundColor: color }}></div>
      <div style={{ backgroundColor: color }}></div>
    </div>
  )
}

export default Loader
