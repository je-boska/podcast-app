import React, { useEffect } from 'react'
import './CurrentEpisodeHero.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentScreen } from '../../slices/playerSlice'
import {
  selectCurrentEpisode,
  setCurrentEpisode,
} from '../../slices/podcastSlice'
import { Link } from 'react-router-dom'

const CurrentEpisodeHero = () => {
  const dispatch = useDispatch()
  const episode = useSelector(selectCurrentEpisode)
  const { collectionName, trackName, artworkUrl160 } = episode

  useEffect(() => {
    const localEpisode = JSON.parse(localStorage.getItem('current-episode'))
    if (!episode.trackId && localEpisode) {
      dispatch(setCurrentEpisode(localEpisode))
    }

    dispatch(setCurrentScreen('home'))
  }, [dispatch, episode])

  return (
    <>
      {episode.trackId && (
        <div className='current-episode-hero-container'>
          <Link
            to='/current-episode'
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <div className='current-episode-hero'>
              <img src={artworkUrl160} alt={trackName} />
              <div className='current-episode-hero-info'>
                <h5>{collectionName}</h5>
                <h3>{trackName}</h3>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}

export default CurrentEpisodeHero
