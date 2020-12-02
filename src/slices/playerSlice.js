import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    viewPlayer: false,
  },
  reducers: {
    setViewPlayer: (state, action) => {
      state.viewPlayer = action.payload
    },
  },
})

export const { setViewPlayer } = playerSlice.actions

export const selectViewPlayer = state => state.player.viewPlayer

export default playerSlice.reducer
