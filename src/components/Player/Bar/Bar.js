import React, { useEffect } from 'react'
import './Bar.css'
import moment from 'moment'
// eslint-disable-next-line
import momentDurationFormatSetup from 'moment-duration-format'

import useAudioPlayer from '../useAudioPlayer'
import { setLoading, selectLoading } from '../../../slices/playerSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Loader/Loader'

export default function Bar({ playing, setPlaying, trackId, header }) {
  const {
    values,
    setDuration,
    setCurTime,
    setClickedTime,
    setSeeking,
    setSeekTime,
  } = useAudioPlayer()

  const { duration, curTime, clickedTime, seekTime, seeking } = values

  const dispatch = useDispatch()

  const loading = useSelector(selectLoading)

  useEffect(() => {
    dispatch(setLoading(true))
  }, [dispatch])

  useEffect(() => {
    const audio = document.getElementById('audio')
    let podcastTimes = JSON.parse(localStorage.getItem('podcast-time'))
    if (!podcastTimes || typeof podcastTimes !== 'object') {
      podcastTimes = {}
    }

    const setAudioData = () => {
      setDuration(audio.duration)
      if (podcastTimes && trackId in podcastTimes) {
        audio.currentTime = podcastTimes[trackId].time
        setCurTime(audio.currentTime)
      }
      dispatch(setLoading(false))
    }

    const setAudioTime = () => {
      if (audio.currentTime !== 0) {
        podcastTimes[trackId] = { time: audio.currentTime, duration: duration }
      }
      localStorage.setItem('podcast-time', JSON.stringify(podcastTimes))
      setCurTime(audio.currentTime)
      curTime === duration && setPlaying(false)
    }

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime
      setClickedTime(null)
    }

    playing && curTime < duration ? audio.play() : audio.pause()

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
    }
  })

  const curPercentage = seeking
    ? (seekTime / duration) * 100
    : (curTime / duration) * 100

  function formatDuration(duration) {
    return moment.duration(duration, 'seconds').format('mm:ss', { trim: false })
  }

  function calcMouseTime(e) {
    const clickPositionInPage = e.pageX
    const bar = document.querySelector('.progress')
    const barStart = bar.getBoundingClientRect().left + window.scrollX
    const barWidth = bar.offsetWidth
    const clickPositionInBar = clickPositionInPage - barStart
    const timePerPixel = duration / barWidth
    return timePerPixel * clickPositionInBar
  }

  function handleTimeDrag(e) {
    setClickedTime(calcMouseTime(e))
    setSeeking(true)

    function updateTimeOnMove(e) {
      setClickedTime(calcMouseTime(e))
      setSeekTime(calcMouseTime(e))
    }

    document.addEventListener('mousemove', updateTimeOnMove)

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', updateTimeOnMove)
      setSeeking(false)
    })
  }

  return (
    <div className='bar'>
      {loading ? (
        <Loader color={header && 'white'} />
      ) : (
        <>
          <span className='time'>{formatDuration(curTime)}</span>
          <div
            className='progress'
            style={{
              background: `linear-gradient(to right, ${
                header ? 'white' : 'black'
              } ${curPercentage}%, ${header ? 'darkGrey' : 'lightGrey'} 0)`,
            }}
            onMouseDown={e => handleTimeDrag(e)}
          >
            <span
              className='knob'
              style={{
                left: `${
                  curPercentage > 0 && curPercentage < 100 && curPercentage - 2
                }%`,
                backgroundColor: header ? 'white' : 'black',
              }}
            />
          </div>
          <span className='time' style={{ color: header ? 'white' : 'black' }}>
            {formatDuration(duration)}
          </span>
        </>
      )}
    </div>
  )
}
