import { useState } from 'react'

function useAudioPlayer() {
  const initialValues = {
    duration: 0,
    curTime: 0,
    seekTime: 0,
    playing: false,
    clickedTime: null,
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
  }
}

export default useAudioPlayer
