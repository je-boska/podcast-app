import React, { useState, useEffect } from 'react'
import './Player.css'
import { lookupEpisodes } from '../../PodcastRequests'

const Player = ({ match }) => {
  const [episode, setEpisode] = useState([])

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
  return (
    <div className='player'>
      <div className='player-image gradient-overlay'>
        <img src={episode.artworkUrl600} alt={episode.trackName} />
      </div>
      <h3 className='title'>{episode.trackName}</h3>
      <audio controls src={episode.episodeUrl}>
        No audio
      </audio>
    </div>
  )
}

export default Player
