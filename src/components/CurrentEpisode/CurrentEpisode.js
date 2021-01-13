import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentScreen } from '../../slices/playerSlice'
import {
  selectCurrentEpisode,
  setCurrentEpisode,
} from '../../slices/podcastSlice'
import './CurrentEpisode.css'

const CurrentEpisode = () => {
  const [viewFullDescription, setViewFullDescription] = useState(false)

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

    dispatch(setCurrentScreen('current-episode'))
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className='current-episode'>
        <Link to='/episode-list'>
          <img src={artworkUrl600} alt={trackName} />
        </Link>
        <div className='current-episode-info'>
          <h3>{collectionName}</h3>
          <h4>{trackName ? trackName : 'No current episode'}</h4>
          <p className='current-episode-date'>{formattedDate}</p>
          <p>
            {description && description.length > 200 && !viewFullDescription
              ? `${description.slice(0, 200)}...`
              : description}
            {description && description.length > 200 && !viewFullDescription && (
              <strong
                style={{ cursor: 'pointer', color: 'blue', fontWeight: '300' }}
                onClick={() => setViewFullDescription(true)}>
                Read more
              </strong>
            )}
          </p>
        </div>
      </div>
    </>
  )
}

export default CurrentEpisode
