import { useState } from 'react'

function useAudioPlayer() {
  const initialValues = {
    duration: 0,
    curTime: 0,
    playing: false,
    clickedTime: null,
    seeking: false,
    seekTime: 0,
  }

  const [values, setValues] = useState(initialValues)

  function setDuration(duration) {
    setValues(prev => ({
      ...prev,
      duration,
    }))
  }

  function setCurTime(curTime) {
    setValues(prev => ({
      ...prev,
      curTime,
    }))
  }

  function setSeekTime(seekTime) {
    setValues(prev => ({
      ...prev,
      seekTime,
    }))
  }

  function setSeeking(seeking) {
    setValues(prev => ({
      ...prev,
      seeking,
    }))
  }

  function setPlaying(playing) {
    setValues(prev => ({
      ...prev,
      playing,
    }))
  }

  function setClickedTime(clickedTime) {
    setValues(prev => ({
      ...prev,
      clickedTime,
    }))
  }

  return {
    values,
    setDuration,
    setCurTime,
    setPlaying,
    setClickedTime,
    setSeekTime,
    setSeeking,
  }
}

export default useAudioPlayer
