import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setEpisode } from '../../slices/podcastSlice'
import './EpisodeListItem.css'

const EpisodeListItem = ({ episode }) => {
  const {
    artworkUrl160,
    trackName,
    releaseDate,
    trackId,
    collectionId,
  } = episode

  const dispatch = useDispatch()

  const selectEpisodeHandler = () => {
    dispatch(setEpisode(trackId))
  }

  return (
    <Link
      to={`/player/${collectionId}/${trackId}`}
      style={{ textDecoration: 'none', color: 'black' }}
      onClick={selectEpisodeHandler}>
      <div className='episode-list-item'>
        <img src={artworkUrl160} alt={trackName} />
        <div className='episode-list-item-text'>
          <h4>{trackName}</h4>
          <p>{releaseDate.slice(0, 10)}</p>
        </div>
      </div>
    </Link>
  )
}

export default EpisodeListItem
