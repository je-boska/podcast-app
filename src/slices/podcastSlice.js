import { createSlice } from '@reduxjs/toolkit'

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    id: '',
  },
  reducers: {
    setPodcast: (state, action) => {
      state.id = action.payload
    },
  },
})

export const { setPodcast } = podcastSlice.actions

export const selectPodcast = state => state.searchTerm.value

export default podcastSlice.reducer
