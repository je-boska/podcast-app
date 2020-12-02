import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentEpisode,
  setCurrentEpisode,
} from '../../../slices/podcastSlice'
import { selectViewPlayer, setViewPlayer } from '../../../slices/playerSlice'
import './Player.css'

import useAudioPlayer from '../useAudioPlayer'
import Bar from '../Bar/Bar'
import Play from '../Play/Play'

const Player = () => {
  const [viewDescription, setViewDescription] = useState(false)
  const viewPlayer = useSelector(selectViewPlayer)

  const { values, setPlaying } = useAudioPlayer()
  const { playing } = values

  const episode = useSelector(selectCurrentEpisode)
  const {
    collectionName,
    trackName,
    releaseDate,
    artworkUrl600,
    episodeUrl,
    trackId,
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
      <div className={`player ${viewPlayer && 'visible'}`}>
        <h2
          className='up-arrow'
          onClick={() => dispatch(setViewPlayer(!viewPlayer))}
        >
          <i className='fas fa-chevron-up'></i>
        </h2>
        <div className={`${!viewDescription && 'hidden'}`}>
          <div className='description'>
            <h4>{collectionName}</h4>
            <p>{formattedDate}</p>
            <p>{description}</p>
          </div>
        </div>
        <div
          className={`player-image gradient-overlay ${
            viewDescription && 'dimmed'
          }`}
          onClick={viewDescriptionHandler}
        >
          <img src={artworkUrl600} alt={trackName} />
        </div>
        <h3 className='title'>{trackName}</h3>
        <audio id='audio' src={episodeUrl}>
          No audio
        </audio>
        <div className='play-container'>
          <Play playing={playing} setPlaying={setPlaying} />
        </div>
        <div className='bar-container'>
          <Bar playing={playing} trackId={trackId} setPlaying={setPlaying} />
        </div>
        <div className='player-header'>
          <div className='header-play-button'>
            <Play playing={playing} setPlaying={setPlaying} />
          </div>
          <div className='header-bar-container'>
            <Bar
              playing={playing}
              trackId={trackId}
              setPlaying={setPlaying}
              header={true}
              loaderColor='white'
            />
          </div>
          <p className='header-track-name'>{trackName}</p>
          <h2
            className='down-arrow'
            onClick={() => dispatch(setViewPlayer(!viewPlayer))}
          >
            <i className='fas fa-chevron-down'></i>
          </h2>
        </div>
      </div>
    </>
  )
}

export default Player
