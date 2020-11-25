import { configureStore } from '@reduxjs/toolkit'
import searchTermReducer from './slices/searchTermSlice'
import podcastReducer from './slices/podcastSlice'
import subscriptionsReducer from './slices/subscriptionsSlice'

export default configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    podcast: podcastReducer,
    subscriptions: subscriptionsReducer,
  },
})
