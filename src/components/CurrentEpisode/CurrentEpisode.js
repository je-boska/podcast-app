import React, { useEffect } from 'react'
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
    <div className='current-episode-container' style={{ margin: '0px 2px' }}>
      <div style={{ maxWidth: '600px', margin: '50px auto 50px auto' }}>
        <h3 style={{ fontWeight: '100', margin: '20px 0px' }}>
          Currently playing
        </h3>
        {episode.trackId && (
          <EpisodeListItem key={episode.trackId} episode={episode} />
        )}
      </div>
    </div>
  )
}

export default CurrentEpisode
