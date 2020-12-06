import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentEpisode,
  setCurrentEpisode,
} from '../../../slices/podcastSlice'
import './Player.css'

const Player = () => {
  const [viewDescription, setViewDescription] = useState(false)

  const episode = useSelector(selectCurrentEpisode)
  const {
    collectionName,
    trackName,
    releaseDate,
    artworkUrl600,
    description,
  } = episode

  const formattedDate = releaseDate ? releaseDate.slice(0, 9) : null

  const dispatch = useDispatch()

  useEffect(() => {
    const localEpisode = JSON.parse(localStorage.getItem('current-episode'))
    if (!episode.collectionName && localEpisode) {
      dispatch(setCurrentEpisode(localEpisode))
    }
    // eslint-disable-next-line
  }, [])

  const viewDescriptionHandler = () => {
    viewDescription ? setViewDescription(false) : setViewDescription(true)
  }

  return (
    <>
      <div className={`player`}>
        <div
          className={`player-image gradient-overlay ${
            viewDescription ? 'dimmed' : null
          }`}
          onClick={viewDescriptionHandler}
        >
          <img src={artworkUrl600} alt={trackName} />
        </div>
        <div
          className={`description ${!viewDescription ? 'hidden' : null}`}
          onClick={viewDescriptionHandler}
        >
          <h4>{collectionName}</h4>
          <p>{formattedDate}</p>
          <p>{description}</p>
        </div>
        <h3 className='title'>
          {trackName ? trackName : 'No current episode'}
        </h3>
      </div>
    </>
  )
}

export default Player
