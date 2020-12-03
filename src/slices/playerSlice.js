import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    loading: false,
    viewPlayer: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setViewPlayer: (state, action) => {
      state.viewPlayer = action.payload
    },
  },
})

export const { setLoading, setViewPlayer } = playerSlice.actions

export const selectLoading = state => state.player.loading
export const selectViewPlayer = state => state.player.viewPlayer

export default playerSlice.reducer
