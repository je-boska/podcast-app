import React, { useState, useEffect } from 'react'
import './Player.css'
import { lookupEpisodes } from '../../PodcastRequests'

const Player = ({ match }) => {
  const [episode, setEpisode] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)

  const audio = document.getElementById('audio')

  const getEpisode = async () => {
    const episodes = await lookupEpisodes(match.params.id)
    setEpisode(
      episodes.filter(
        episode => episode.trackId === Number(match.params.trackId)
      )[0]
    )
  }

  useEffect(() => {
    getEpisode()
    //eslint-disable-next-line
  }, [])

  const play = () => {
    audio.play()
    setIsPlaying(true)
  }

  const pause = () => {
    audio.pause()
    setIsPlaying(false)
  }

  return (
    <div className='player'>
      <div className='player-image gradient-overlay'>
        <img src={episode.artworkUrl600} alt={episode.trackName} />
      </div>
      <h3 className='title'>{episode.trackName}</h3>
      <audio id='audio' src={episode.episodeUrl}>
        No audio
      </audio>
      <h2 className='play-pause-button'>
        {isPlaying ? (
          <i onClick={pause} className='fas fa-pause' />
        ) : (
          <i onClick={play} className='fas fa-play' />
        )}
      </h2>
    </div>
  )
}

export default Player
