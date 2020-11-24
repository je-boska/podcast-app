import React, { useEffect } from 'react'
import moment from 'moment'
// eslint-disable-next-line
import momentDurationFormatSetup from 'moment-duration-format'

import './Bar.css'

import useAudioPlayer from '../useAudioPlayer'

export default function Bar() {
  const { values, setDuration, setCurTime, setClickedTime } = useAudioPlayer()

  const { duration, curTime, clickedTime, seekTime, seeking } = values

  useEffect(() => {
    const audio = document.getElementById('audio')

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration)
      setCurTime(audio.currentTime)
    }

    const setAudioTime = () => {
      setCurTime(audio.currentTime)
    }

    // DOM listeners: update React state on DOM events
    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime
      setClickedTime(null)
    }

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

  function calcClickedTime(e) {
    const clickPositionInPage = e.pageX
    const bar = document.querySelector('.bar__progress')
    const barStart = bar.getBoundingClientRect().left + window.scrollX
    const barWidth = bar.offsetWidth
    const clickPositionInBar = clickPositionInPage - barStart
    const timePerPixel = duration / barWidth
    return timePerPixel * clickPositionInBar
  }

  function handleTimeDrag(e) {
    setClickedTime(calcClickedTime(e))
  }

  return (
    <div className='bar'>
      <span className='bar__time'>{formatDuration(curTime)}</span>
      <div
        className='bar__progress'
        style={{
          background: `linear-gradient(to right, black ${curPercentage}%, lightGrey 0)`,
        }}
        onMouseDown={handleTimeDrag}>
        <span
          className='bar__progress__knob'
          style={{
            left: `${
              curPercentage > 0 && curPercentage < 100 && curPercentage - 2
            }%`,
          }}
        />
      </div>
      <span className='bar__time'>{formatDuration(duration)}</span>
    </div>
  )
}
