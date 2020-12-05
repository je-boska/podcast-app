import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentEpisode,
  setCurrentEpisode,
} from '../../../slices/podcastSlice'
import { selectLoading } from '../../../slices/playerSlice'
import { selectViewPlayer, setViewPlayer } from '../../../slices/playerSlice'
import './Player.css'

import useAudioPlayer from '../useAudioPlayer'
import Bar from '../Bar/Bar'
import Play from '../Play/Play'
import Loader from '../../Loader/Loader'

const Player = () => {
  const [viewDescription, setViewDescription] = useState(false)
  const viewPlayer = useSelector(selectViewPlayer)

  const { values, setPlaying } = useAudioPlayer()
  const { playing } = values

  const loading = useSelector(selectLoading)
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
        <audio id='audio' src={episodeUrl}>
          No audio
        </audio>
        <div className='play-container'>
          <Play playing={playing} setPlaying={setPlaying} />
        </div>
        {trackName && (
          <div className='bar-container'>
            <Bar playing={playing} trackId={trackId} setPlaying={setPlaying} />
          </div>
        )}
        <div className='player-header'>
          <div className='player-header-items'>
            {trackName && (
              <div className='header-play-button'>
                {loading ? (
                  <Loader color='white' />
                ) : (
                  <Play playing={playing} setPlaying={setPlaying} />
                )}
              </div>
            )}
            {trackName && (
              <div className='header-bar-container'>
                <Bar
                  playing={playing}
                  trackId={trackId}
                  setPlaying={setPlaying}
                  header={true}
                />
              </div>
            )}
            {/*<p className='header-track-name'>
              {trackName ? trackName : 'No current episode'}
            </p>*/}
            <h2
              className='down-arrow'
              onClick={() => dispatch(setViewPlayer(!viewPlayer))}
            >
              <i className='fas fa-chevron-down'></i>
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Player
