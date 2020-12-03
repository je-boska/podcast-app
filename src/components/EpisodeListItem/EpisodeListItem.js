import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentEpisode } from '../../slices/podcastSlice'
import { setLoading } from '../../slices/playerSlice'
import './EpisodeListItem.css'

const EpisodeListItem = ({ episode }) => {
  const { artworkUrl160, trackName, releaseDate, trackId } = episode

  const [playedPercentage, setPlayedPercentage] = useState(0)

  const dispatch = useDispatch()

  useEffect(() => {
    let podcastTimes = JSON.parse(localStorage.getItem('podcast-time'))
    if (podcastTimes && trackId in podcastTimes) {
      const { time, duration } = podcastTimes[trackId]
      setPlayedPercentage((time / duration) * 100)
    }
    // eslint-disable-next-line
  }, [])

  const selectEpisodeHandler = () => {
    dispatch(setLoading(true))
    dispatch(setCurrentEpisode(episode))
    localStorage.setItem('current-episode', JSON.stringify(episode))

    const audio = document.getElementById('audio')
    let podcastTimes = JSON.parse(localStorage.getItem('podcast-time'))
    if (!podcastTimes || typeof podcastTimes !== 'object') {
      podcastTimes = {}
    }
    if (podcastTimes && trackId in podcastTimes) {
      audio.currentTime = podcastTimes[trackId].time
    } else {
      audio.currentTime = 0
    }
  }

  return (
    <div className='episode-list-item' onClick={selectEpisodeHandler}>
      <img src={artworkUrl160} alt={trackName} />
      <div className='episode-list-item-text'>
        <h4>{trackName}</h4>
        <p>{releaseDate.slice(0, 10)}</p>
        <p style={{ color: 'green' }}>{playedPercentage > 90 && 'Played'}</p>
        <div
          className='played-percentage-bar'
          style={{
            background: `linear-gradient(to right, orange ${playedPercentage}%, lightGrey 0)`,
          }}
        ></div>
      </div>
    </div>
  )
}

export default EpisodeListItem
