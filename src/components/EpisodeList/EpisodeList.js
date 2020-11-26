import React from 'react'
import './EpisodeList.css'
import { Link } from 'react-router-dom'
import EpisodeListItem from '../EpisodeListItem/EpisodeListItem'
import { selectEpisodes } from '../../slices/podcastSlice'
import { useSelector } from 'react-redux'

const EpisodeList = () => {
  const episodes = useSelector(selectEpisodes)

  const { artworkUrl600, collectionName } = episodes[0]

  return (
    <div className='episode-list'>
      <section className='episode-list-hero'>
        <img src={artworkUrl600} alt={collectionName} />
        <h3 className='episode-list-title'>{collectionName}</h3>
      </section>
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

      {episodes.map(episode => (
        <EpisodeListItem key={episode.trackId} episode={episode} />
      ))}
    </div>
  )
}

export default EpisodeList
