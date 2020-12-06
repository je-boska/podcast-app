import { createSlice } from '@reduxjs/toolkit'

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    loading: false,
    currentScreen: 'home',
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload
    },
  },
})

export const { setLoading, setCurrentScreen } = playerSlice.actions

export const selectLoading = state => state.player.loading
export const selectCurrentScreen = state => state.player.currentScreen

export default playerSlice.reducer
