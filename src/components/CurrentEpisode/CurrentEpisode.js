import React, { useEffect } from 'react'
import './CurrentEpisode.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentScreen } from '../../slices/playerSlice'
import {
  selectCurrentEpisode,
  setCurrentEpisode,
} from '../../slices/podcastSlice'
import { Link } from 'react-router-dom'

const CurrentEpisode = () => {
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
        <div className='current-episode-container'>
          <Link to='/player' style={{ textDecoration: 'none', color: 'white' }}>
            <div className='current-episode'>
              <img src={artworkUrl160} alt={trackName} />
              <div className='current-episode-info'>
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

export default CurrentEpisode
