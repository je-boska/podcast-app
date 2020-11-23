import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Player.css'
import { lookupEpisodes } from '../../../PodcastRequests'
import Bar from '../Bar/Bar'
import useAudioPlayer from '../useAudioPlayer'

const Player = ({ match }) => {
  const {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
  } = useAudioPlayer()

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

  const play = () => {
    setPlaying(true)
  }

  const pause = () => {
    setPlaying(false)
  }

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
      <h2 className='play-pause-button'>
        {playing ? (
          <i onClick={pause} className='fas fa-pause' />
        ) : (
          <i onClick={play} className='fas fa-play' />
        )}
      </h2>
      <Bar
        curTime={curTime}
        duration={duration}
        onTimeUpdate={time => setClickedTime(time)}
      />
    </div>
  )
}

export default Player
