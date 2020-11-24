import { createSlice } from '@reduxjs/toolkit'

const searchTermSlice = createSlice({
  name: 'seachTerm',
  initialState: {
    value: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setSearchTerm } = searchTermSlice.actions

export const selectSearchTerm = state => state.searchTerm.value

export default searchTermSlice.reducer
