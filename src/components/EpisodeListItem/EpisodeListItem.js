import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentEpisode } from '../../slices/podcastSlice'
import './EpisodeListItem.css'

const EpisodeListItem = ({ episode }) => {
  const { artworkUrl160, trackName, releaseDate } = episode

  const dispatch = useDispatch()

  const selectEpisodeHandler = () => {
    dispatch(setCurrentEpisode(episode))
  }

  return (
    <Link
      to={`/player`}
      style={{ textDecoration: 'none', color: 'black' }}
      onClick={selectEpisodeHandler}>
      <div className='episode-list-item'>
        <img src={artworkUrl160} alt={trackName} />
        <div className='episode-list-item-text'>
          <h3>{trackName}</h3>
          <p>{releaseDate.slice(0, 10)}</p>
        </div>
      </div>
    </Link>
  )
}

export default EpisodeListItem
