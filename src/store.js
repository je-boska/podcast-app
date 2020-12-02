import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'
import podcastReducer from './slices/podcastSlice'
import subscriptionsReducer from './slices/subscriptionsSlice'
import playerReducer from './slices/playerSlice'

export default configureStore({
  reducer: {
    search: searchReducer,
    podcast: podcastReducer,
    subscriptions: subscriptionsReducer,
    player: playerReducer,
  },
})
