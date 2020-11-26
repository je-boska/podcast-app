import React from 'react'

const Play = ({ playing, setPlaying }) => {
  const play = () => {
    setPlaying(true)
  }

  const pause = () => {
    setPlaying(false)
  }

  return (
    <h1 className='play-pause-button'>
      {playing ? (
        <i onClick={pause} className='fas fa-pause' />
      ) : (
        <i onClick={play} className='fas fa-play' />
      )}
    </h1>
  )
}

export default Play
