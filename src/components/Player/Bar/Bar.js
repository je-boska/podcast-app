import React, { useEffect } from 'react'
import './Bar.css'
import moment from 'moment'
// eslint-disable-next-line
import momentDurationFormatSetup from 'moment-duration-format'

import useAudioPlayer from '../useAudioPlayer'
import { selectLoading, setLoading } from '../../../slices/podcastSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../Loader/Loader'

export default function Bar({ playing, trackId }) {
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

    const audio = document.getElementById('audio')
    let podcastTimes = JSON.parse(localStorage.getItem('podcast-time'))
    if (podcastTimes && trackId in podcastTimes) {
      audio.currentTime = podcastTimes[trackId].time
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const audio = document.getElementById('audio')
    let podcastTimes = JSON.parse(localStorage.getItem('podcast-time'))
    if (!podcastTimes || typeof podcastTimes !== 'object') {
      podcastTimes = {}
    }

    // state setters wrappers
    const setAudioData = () => {
      dispatch(setLoading(false))
      setDuration(audio.duration)
      setCurTime(audio.currentTime)
    }

    const setAudioTime = () => {
      podcastTimes[trackId] = { time: audio.currentTime, duration: duration }
      localStorage.setItem('podcast-time', JSON.stringify(podcastTimes))
      setCurTime(audio.currentTime)
    }

    // DOM listeners: update React state on DOM events
    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime
      setClickedTime(null)
    }

    playing ? audio.play() : audio.pause()

    // effect cleanup
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
        <Loader />
      ) : (
        <>
          <span className='time'>{formatDuration(curTime)}</span>
          <div
            className='progress'
            style={{
              background: `linear-gradient(to right, black ${curPercentage}%, lightGrey 0)`,
            }}
            onMouseDown={e => handleTimeDrag(e)}>
            <span
              className='knob'
              style={{
                left: `${
                  curPercentage > 0 && curPercentage < 100 && curPercentage - 2
                }%`,
              }}
            />
          </div>
          <span className='time'>{formatDuration(duration)}</span>
        </>
      )}
    </div>
  )
}
