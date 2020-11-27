import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentEpisode,
  setCurrentEpisode,
  setEpisodes,
  setLoading,
} from '../../../slices/podcastSlice'
import { lookupEpisodes } from '../../../PodcastRequests'
import './Player.css'

import useAudioPlayer from '../useAudioPlayer'
import Bar from '../Bar/Bar'
import Play from '../Play/Play'

const Player = () => {
  const { values, setPlaying } = useAudioPlayer()
  const { playing } = values

  const episode = useSelector(selectCurrentEpisode)
  const { trackName, artworkUrl600, episodeUrl, collectionId } = episode

  const dispatch = useDispatch()

  useEffect(() => {
    const localEpisode = JSON.parse(localStorage.getItem('current-episode'))
    dispatch(setCurrentEpisode(localEpisode))
    // eslint-disable-next-line
  }, [])

  const loadEpisodesHandler = async () => {
    dispatch(setLoading(true))
    const episodes = await lookupEpisodes(collectionId)
    dispatch(setEpisodes(episodes.slice(1)))
    dispatch(setLoading(false))
  }

  return (
    <>
      <Link to={`/episode-list`} onClick={loadEpisodesHandler}>
        <i
          className='fas fa-arrow-left'
          style={{
            position: 'absolute',
            zIndex: '1',
            top: '15px',
            left: '20px',
            color: 'white',
            backgroundColor: 'black',
          }}
        />
      </Link>
      <div className='player'>
        <div className='player-image gradient-overlay'>
          <img src={artworkUrl600} alt={trackName} />
        </div>
        <h3 className='title'>{trackName}</h3>
        <audio id='audio' src={episodeUrl}>
          No audio
        </audio>
        <Play playing={playing} setPlaying={setPlaying} />
        <Bar playing={playing} />
      </div>
    </>
  )
}

export default Player
