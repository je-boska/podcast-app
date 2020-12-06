import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectLoading } from '../../slices/playerSlice'
import { selectCurrentEpisode } from '../../slices/podcastSlice'
import Loader from '../Loader/Loader'
import Play from '../Player/Play/Play'
import useAudioPlayer from '../Player/useAudioPlayer'
import Bar from '../Player/Bar/Bar'

const Header = () => {
  const loading = useSelector(selectLoading)
  const episode = useSelector(selectCurrentEpisode)
  const { trackName, trackId, episodeUrl } = episode

  const { values, setPlaying } = useAudioPlayer()
  const { playing } = values

  return (
    <div className='player-header'>
      <audio id='audio' src={episodeUrl}>
        No audio
      </audio>
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
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
          <h2 className='up-arrow'>
            <i className='fas fa-chevron-up'></i>
          </h2>
        </Link>
      </div>
    </div>
  )
}

export default Header
