import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    loading: false,
    searching: false,
    searchTerm: '',
    searchResults: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setSearching: (state, action) => {
      state.searching = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
    },
  },
})

export const {
  setSearchTerm,
  setSearchResults,
  setLoading,
  setSearching,
} = searchSlice.actions

export const selectLoading = state => state.search.loading
export const selectSearching = state => state.search.searching
export const selectSearchTerm = state => state.search.searchTerm
export const selectSearchResults = state => state.search.searchResults

export default searchSlice.reducer
