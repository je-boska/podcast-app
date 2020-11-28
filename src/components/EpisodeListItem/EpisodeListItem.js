import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentEpisode } from '../../slices/podcastSlice'
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
    dispatch(setCurrentEpisode(episode))
    localStorage.setItem('current-episode', JSON.stringify(episode))
  }

  return (
    <Link
      to={`/player`}
      style={{ textDecoration: 'none', color: 'black' }}
      onClick={selectEpisodeHandler}>
      <div className='episode-list-item'>
        <img src={artworkUrl160} alt={trackName} />
        <div className='episode-list-item-text'>
          <h4>{trackName}</h4>
          <p>{releaseDate.slice(0, 10)}</p>
          <div
            className='played-percentage-bar'
            style={{
              background: `linear-gradient(to right, orange ${playedPercentage}%, lightGrey 0)`,
            }}></div>
          <p style={{ color: 'green' }}>{playedPercentage > 90 && 'Played'}</p>
        </div>
      </div>
    </Link>
  )
}

export default EpisodeListItem
