import React from 'react'

const Play = ({ playing, setPlaying }) => {
  const audio = document.getElementById('audio')

  const play = () => {
    setPlaying(true)
    audio.play()
  }

  const pause = () => {
    setPlaying(false)
    audio.pause()
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
