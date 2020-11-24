import React, { useState, useEffect } from 'react'
import './EpisodeList.css'
import { Link } from 'react-router-dom'
import { lookupEpisodes } from '../../PodcastRequests'
import EpisodeListItem from '../EpisodeListItem/EpisodeListItem'

const EpisodeList = ({ match }) => {
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    getPodcast()
    //eslint-disable-next-line
  }, [])

  const getPodcast = async () => {
    const newEpisodes = await lookupEpisodes(match.params.id)
    setEpisodes(newEpisodes.slice(1))
  }

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
        <EpisodeListItem key={episode.trackId} episode={episode} />
      ))}
    </div>
  )
}

export default EpisodeList
