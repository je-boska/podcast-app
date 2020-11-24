import { configureStore } from '@reduxjs/toolkit'
import searchTermReducer from './slices/searchTermSlice'
import podcastReducer from './slices/podcastSlice'

export default configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    podcast: podcastReducer,
  },
})
