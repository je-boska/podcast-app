import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
    searchResults: [],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
    },
  },
})

export const { setSearchTerm, setSearchResults } = searchSlice.actions

export const selectSearchTerm = state => state.search.searchTerm
export const selectSearchResults = state => state.search.searchResults

export default searchSlice.reducer
