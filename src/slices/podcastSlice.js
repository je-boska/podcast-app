import { createSlice } from '@reduxjs/toolkit'

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    episodes: [],
    currentEpisode: {},
  },
  reducers: {
    setEpisodes: (state, action) => {
      state.episodes = state.episodes.concat(action.payload)
    },
    setCurrentEpisode: (state, action) => {
      state.currentEpisode = action.payload
    },
  },
})

export const { setEpisodes, setCurrentEpisode } = podcastSlice.actions

export const selectEpisodes = state => state.podcast.episodes
export const selectCurrentEpisode = state => state.podcast.currentEpisode

export default podcastSlice.reducer
