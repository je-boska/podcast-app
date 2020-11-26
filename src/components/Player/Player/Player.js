import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentEpisode } from '../../../slices/podcastSlice'
import './Player.css'

import useAudioPlayer from '../useAudioPlayer'
import Bar from '../Bar/Bar'
import Play from '../Play/Play'

const Player = () => {
  const { values, setPlaying } = useAudioPlayer()

  const { playing } = values

  const episode = useSelector(selectCurrentEpisode)

  const { trackName, artworkUrl600, episodeUrl } = episode

  return (
    <div className='player'>
      <Link to={`/episode-list`}>
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
        <img src={artworkUrl600} alt={trackName} />
      </div>
      <h3 className='title'>{trackName}</h3>
      <audio id='audio' src={episodeUrl}>
        No audio
      </audio>
      <Play playing={playing} setPlaying={setPlaying} />
      <Bar playing={playing} />
    </div>
  )
}

export default Player
