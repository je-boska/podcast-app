import React, { useEffect } from 'react'
import './CurrentEpisode.css'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentScreen } from '../../slices/playerSlice'
import {
  selectCurrentEpisode,
  setCurrentEpisode,
} from '../../slices/podcastSlice'
import EpisodeListItem from '../EpisodeListItem/EpisodeListItem'

const CurrentEpisode = () => {
  const dispatch = useDispatch()
  const episode = useSelector(selectCurrentEpisode)

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
          <div className='current-episode'>
            <h4 className='current-episode-title'>Playing</h4>
            {episode.trackId && (
              <EpisodeListItem key={episode.trackId} episode={episode} />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default CurrentEpisode
