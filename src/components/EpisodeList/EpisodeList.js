import React, { useEffect } from 'react'
import './EpisodeList.css'
import { Link } from 'react-router-dom'
import EpisodeListItem from '../EpisodeListItem/EpisodeListItem'
import {
  selectEpisodes,
  selectLoading,
  selectPodcast,
  setEpisodes,
  setLoading,
  setPodcast,
} from '../../slices/podcastSlice'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../Loader/Loader'
import { lookupEpisodes } from '../../PodcastRequests'
import SubscribeButton from '../SubscribeButton/SubscribeButton'

const EpisodeList = () => {
  const dispatch = useDispatch()
  const podcast = useSelector(selectPodcast)
  const episodes = useSelector(selectEpisodes)
  const loading = useSelector(selectLoading)

  const {
    collectionName,
    artworkUrl600,
    primaryGenreName,
    artistName,
  } = podcast

  useEffect(() => {
    if (podcast.collectionId) {
      loadEpisodes(podcast.collectionId)
    } else {
      const localPodcast = JSON.parse(localStorage.getItem('current-podcast'))
      dispatch(setPodcast(localPodcast))
      loadEpisodes(localPodcast.collectionId)
    }
    // eslint-disable-next-line
  }, [])

  const loadEpisodes = async collectionId => {
    dispatch(setLoading(true))
    const episodes = await lookupEpisodes(collectionId)
    dispatch(setEpisodes(episodes.slice(1)))
    dispatch(setLoading(false))
  }

  return (
    <div className='episode-list-container'>
      {loading || episodes.length < 1 ? (
        <Loader />
      ) : (
        <div className='episode-list-hero'>
          <Link to='/'>
            <div className='back-arrow'>
              <i className='fas fa-chevron-left' />
            </div>
          </Link>
          <img src={artworkUrl600} alt={collectionName} />
          <div className='episode-list-info-and-sub'>
            <div className='episode-list-info'>
              <h3>{collectionName}</h3>
              <p>by {artistName}</p>
              <p>{primaryGenreName}</p>
            </div>
            <SubscribeButton podcast={podcast} />
          </div>
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
  )
}

export default EpisodeList
