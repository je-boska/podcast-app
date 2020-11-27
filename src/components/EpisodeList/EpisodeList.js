import React from 'react'
import './EpisodeList.css'
import { Link } from 'react-router-dom'
import EpisodeListItem from '../EpisodeListItem/EpisodeListItem'
import { selectEpisodes, selectLoading } from '../../slices/podcastSlice'
import { useSelector } from 'react-redux'
import Loader from '../Loader/Loader'

const EpisodeList = () => {
  const episodes = useSelector(selectEpisodes)
  const loading = useSelector(selectLoading)

  return (
    <>
      <Link to='/search'>
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
      <div className='episode-list-container'>
        {loading ? (
          <Loader />
        ) : (
          <div className='episode-list-hero'>
            <img
              src={episodes[0].artworkUrl600}
              alt={episodes[0].collectionName}
            />
            <h3 className='episode-list-title'>{episodes[0].collectionName}</h3>
          </div>
        )}

        <div className='episode-list'>
          {loading
            ? null
            : episodes.map(episode => (
                <EpisodeListItem key={episode.trackId} episode={episode} />
              ))}
        </div>
      </div>
    </>
  )
}

export default EpisodeList
