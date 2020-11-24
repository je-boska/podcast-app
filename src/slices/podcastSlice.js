import { createSlice } from '@reduxjs/toolkit'

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    podcastId: '',
    episodeId: '',
  },
  reducers: {
    setPodcast: (state, action) => {
      state.podcastId = action.payload
    },
    setEpisode: (state, action) => {
      state.episodeId = action.payload
    },
  },
})

export const { setPodcast, setEpisode } = podcastSlice.actions

export const selectPodcast = state => state.podcast.podcastId
export const selectEpisode = state => state.podcast.episodeId

export default podcastSlice.reducer
