import React, { useEffect } from 'react'
import './EpisodeList.css'
import { Link } from 'react-router-dom'
import EpisodeListItem from '../EpisodeListItem/EpisodeListItem'
import { selectEpisodes, selectLoading, selectPodcast, setEpisodes, setLoading } from '../../slices/podcastSlice'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loader/Loader'
import { lookupEpisodes } from '../../PodcastRequests'

const EpisodeList = () => {
  const dispatch = useDispatch()
  const podcast = useSelector(selectPodcast)
  const episodes = useSelector(selectEpisodes)
  const loading = useSelector(selectLoading)

  useEffect(() => {
    if (podcast.collectionId) {
      loadEpisodes(podcast.collectionId)
    } else {
      const localPodcast = JSON.parse(localStorage.getItem('current-podcast'))
      loadEpisodes(localPodcast.collectionId)
    }
    // eslint-disable-next-line
  }, [])

  const loadEpisodes = async (collectionId) => {
    dispatch(setLoading(true))
    const episodes = await lookupEpisodes(collectionId)
    dispatch(setEpisodes(episodes.slice(1)))
    dispatch(setLoading(false))
  }

  return (
    <>
      <Link to='/search'>
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
      <div className='episode-list-container'>
        {loading || episodes.length < 1 ? (
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
