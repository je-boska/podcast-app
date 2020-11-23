import React, { useState, useEffect } from 'react'
import './EpisodeList.css'
import { Link } from 'react-router-dom'
import { lookupEpisodes } from '../../PodcastRequests'
import EpisodeListItem from '../EpisodeListItem/EpisodeListItem'

const EpisodeList = ({ match }) => {
  const [episodes, setEpisodes] = useState([])

  const getPodcast = async () => {
    const newEpisodes = await lookupEpisodes(match.params.id)
    setEpisodes(newEpisodes.slice(1))
  }

  useEffect(() => {
    getPodcast()
    //eslint-disable-next-line
  }, [])

  return (
    <div className='episode-list'>
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
        <Link
          to={`/player/${match.params.id}/${episode.trackId}`}
          style={{ textDecoration: 'none', color: 'black' }}
          key={episode.trackId}>
          <EpisodeListItem episode={episode} />
        </Link>
      ))}
    </div>
  )
}

export default EpisodeList
