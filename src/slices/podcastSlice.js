import { createSlice } from '@reduxjs/toolkit'

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    loading: false,
    podcast: {},
    episodes: [],
    currentEpisode: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setPodcast: (state, action) => {
      state.podcast = action.payload
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
  setPodcast,
  setEpisodes,
  setCurrentEpisode,
} = podcastSlice.actions

export const selectLoading = state => state.podcast.loading
export const selectPodcast = state => state.podcast.podcast
export const selectEpisodes = state => state.podcast.episodes
export const selectCurrentEpisode = state => state.podcast.currentEpisode

export default podcastSlice.reducer
