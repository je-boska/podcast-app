import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentScreen, selectLoading } from '../../../slices/playerSlice'
import { selectCurrentEpisode } from '../../../slices/podcastSlice'
import Loader from '../../Loader/Loader'
import Play from '../Play/Play'
import useAudioPlayer from '../useAudioPlayer'
import Bar from '../Bar/Bar'

const Footer = () => {
  const loading = useSelector(selectLoading)
  const episode = useSelector(selectCurrentEpisode)
  const currentScreen = useSelector(selectCurrentScreen)
  const { trackName, trackId, episodeUrl } = episode

  const { values, setPlaying } = useAudioPlayer()
  const { playing } = values

  return (
    <>
      <audio id='audio' src={episodeUrl}>
        No audio
      </audio>
      {trackName && (
        <div className='footer'>
          <div className='footer-items'>
            <div className='footer-play-button'>
              {loading ? (
                <Loader color='white' />
              ) : (
                <Play playing={playing} setPlaying={setPlaying} />
              )}
            </div>
            <div className='footer-bar-container'>
              <Bar
                playing={playing}
                trackId={trackId}
                setPlaying={setPlaying}
                header={true}
              />
            </div>
            <Link
              to={`${
                currentScreen === 'current-episode' ? '/' : '/current-episode'
              }`}
              style={{ textDecoration: 'none', color: 'white' }}>
              <h2 className='footer-nav-button'>
                {currentScreen === 'current-episode' ? (
                  <i className='fas fa-bars'></i>
                ) : (
                  <i className='fas fa-chevron-up'></i>
                )}
              </h2>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer
