import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentScreen } from '../../../slices/playerSlice'
import {
  selectCurrentEpisode,
  setCurrentEpisode,
} from '../../../slices/podcastSlice'
import './Player.css'

const Player = () => {
  const episode = useSelector(selectCurrentEpisode)
  const {
    collectionName,
    trackName,
    releaseDate,
    artworkUrl600,
    description,
  } = episode

  const formattedDate = releaseDate ? releaseDate.slice(0, 10) : null

  const dispatch = useDispatch()

  useEffect(() => {
    const localEpisode = JSON.parse(localStorage.getItem('current-episode'))
    if (!episode.collectionName && localEpisode) {
      dispatch(setCurrentEpisode(localEpisode))
    }

    dispatch(setCurrentScreen('player'))
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className='player'>
        <img src={artworkUrl600} alt={trackName} className='player-image' />
        <div className='episode-info'>
          <h3>{collectionName}</h3>
          <h4>{trackName ? trackName : 'No current episode'}</h4>
          <p>{formattedDate}</p>
          <p>{description}</p>
        </div>
      </div>
    </>
  )
}

export default Player
