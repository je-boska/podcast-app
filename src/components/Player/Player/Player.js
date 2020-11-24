import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './Player.css'

import { lookupEpisodes } from '../../../PodcastRequests'

import Bar from '../Bar/Bar'
import Play from '../Play/Play'
import useAudioPlayer from '../useAudioPlayer'

const Player = ({ match }) => {
  const { values, setPlaying } = useAudioPlayer()

  const { playing } = values

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
      <Link to={`/episode-list/${match.params.id}`}>
        <i
          className='fas fa-arrow-left'
          style={{
            position: 'absolute',
            zIndex: '1',
            top: '15px',
            left: '20px',
            color: 'white',
            backgroundColor: 'black',
          }}
        />
      </Link>
      <div className='player-image gradient-overlay'>
        <img src={episode.artworkUrl600} alt={episode.trackName} />
      </div>
      <h3 className='title'>{episode.trackName}</h3>
      <audio id='audio' src={episode.episodeUrl}>
        No audio
      </audio>
      <Play playing={playing} setPlaying={setPlaying} />
      <Bar playing={playing} />
    </div>
  )
}

export default Player
