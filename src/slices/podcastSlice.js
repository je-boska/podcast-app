import { createSlice } from '@reduxjs/toolkit'

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    loading: false,
    episodes: [],
    currentEpisode: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setEpisodes: (state, action) => {
      state.episodes = action.payload
    },
    setCurrentEpisode: (state, action) => {
      state.currentEpisode = action.payload
    },
  },
})

export const {
  setLoading,
  setEpisodes,
  setCurrentEpisode,
} = podcastSlice.actions

export const selectLoading = state => state.podcast.loading
export const selectEpisodes = state => state.podcast.episodes
export const selectCurrentEpisode = state => state.podcast.currentEpisode

export default podcastSlice.reducer
