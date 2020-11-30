import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentEpisode, setCurrentEpisode} from '../../../slices/podcastSlice'
import './Player.css'

import useAudioPlayer from '../useAudioPlayer'
import Bar from '../Bar/Bar'
import Play from '../Play/Play'

const Player = () => {
  const [ viewDescription, setViewDescription ] = useState(false)

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
    description
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
      <Link to={`/episode-list`}>
        <i
          className='fas fa-arrow-left'
          style={{
            position: 'fixed',
            zIndex: '1',
            top: '15px',
            left: '20px',
            color: 'white',
            backgroundColor: 'black',
          }}
        />
      </Link>
      <div className='player'>
        <div className={`${!viewDescription && 'hidden'}`}>
          <div className="description">
            <h4>{collectionName}</h4>
            <p>{formattedDate}</p>
            <p>{description}</p>
          </div>
        </div>
        <div className={`player-image gradient-overlay ${viewDescription && 'dimmed'}`} onClick={viewDescriptionHandler}>
          <img src={artworkUrl600} alt={trackName} />
        </div>
        <h3 className='title'>{trackName}</h3>
        <audio id='audio' src={episodeUrl}>
          No audio
        </audio>
        <Play playing={playing} setPlaying={setPlaying} />
        <Bar playing={playing} trackId={trackId} setPlaying={setPlaying} />
      </div>
    </>
  )
}

export default Player
