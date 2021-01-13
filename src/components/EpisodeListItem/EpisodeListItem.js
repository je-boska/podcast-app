import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentEpisode,
  setCurrentEpisode,
} from '../../slices/podcastSlice'
import { setLoading } from '../../slices/playerSlice'
import './EpisodeListItem.css'
import { Link } from 'react-router-dom'

const EpisodeListItem = ({ episode }) => {
  const { artworkUrl160, trackName, releaseDate, trackId } = episode

  const [playedPercentage, setPlayedPercentage] = useState(0)
  const currentEpisode = useSelector(selectCurrentEpisode)

  const dispatch = useDispatch()

  function getOrCreatePodcastTimes() {
    let podcastTimes = JSON.parse(localStorage.getItem('podcast-time'))
    if (!podcastTimes || typeof podcastTimes !== 'object') {
      return {}
    }
    return podcastTimes
  }

  function getTimeOfPodcastOrSetToZero(podcastTimes) {
    const audio = document.getElementById('audio')
    if (podcastTimes && trackId in podcastTimes) {
      audio.currentTime = podcastTimes[trackId].time
    } else {
      audio.currentTime = 0
    }
  }

  function selectEpisodeHandler() {
    if (episode.trackId !== currentEpisode.trackId) {
      dispatch(setLoading(true))
      dispatch(setCurrentEpisode(episode))
      localStorage.setItem('current-episode', JSON.stringify(episode))
      const podcastTimes = getOrCreatePodcastTimes()
      getTimeOfPodcastOrSetToZero(podcastTimes)
    }
  }

  useEffect(() => {
    let podcastTimes = getOrCreatePodcastTimes()
    if (trackId in podcastTimes) {
      const { time, duration } = podcastTimes[trackId]
      setPlayedPercentage((time / duration) * 100)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Link
        to='/current-episode'
        style={{ textDecoration: 'none', color: 'black' }}>
        <div className='episode-list-item' onClick={selectEpisodeHandler}>
          <img src={artworkUrl160} alt={trackName} />
          <div className='episode-list-item-text'>
            <h4>{trackName}</h4>
            <p>{releaseDate.slice(0, 10)}</p>
            <p style={{ color: 'green' }}>
              {playedPercentage > 90 && 'Played'}
            </p>
            <div
              className='played-percentage-bar'
              style={{
                background: `linear-gradient(to right, orange ${playedPercentage}%, lightGrey 0)`,
              }}></div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default EpisodeListItem
